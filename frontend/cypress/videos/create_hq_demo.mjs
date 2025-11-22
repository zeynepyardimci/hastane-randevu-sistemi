import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import util from 'util';
import { fileURLToPath } from 'url';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const execPromise = util.promisify(exec);

// Narration text segments
const narrationSegments = [
    "Randevu alma sayfasına hoş geldiniz.",
    "Burada kolayca yeni bir randevu oluşturabilirsiniz.",
    "İlk olarak, muayene olmak istediğiniz doktoru seçin.",
    "Ardından, hasta bilgisini seçin.",
    "Uygun olduğunuz tarihi ve saati belirleyin.",
    "Bilgileri kontrol ettikten sonra randevuyu onaylayın.",
    "Randevunuz başarıyla oluşturuldu. Geçmiş olsun dileklerimizle."
];

async function downloadTTS(text, index) {
    return new Promise((resolve, reject) => {
        const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=tr&client=tw-ob`;
        const filePath = path.join(__dirname, `part_${index}.mp3`);
        const file = fs.createWriteStream(filePath);

        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to download TTS: ${response.statusCode}`));
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                resolve(filePath);
            });
        }).on('error', (err) => {
            fs.unlink(filePath, () => { });
            reject(err);
        });
    });
}

async function createHighQualityDemo() {
    console.log('🎬 Yüksek kaliteli Türkçe sesli demo oluşturuluyor...\n');

    const videoPath = path.join(__dirname, 'appointment_booking.cy.js.mp4');
    const finalAudioPath = path.join(__dirname, 'appointment_narration_hq.mp3');
    const outputPath = path.join(__dirname, 'appointment_demo_hq_tr.mp4');

    // 1. Download audio segments
    console.log('⬇️  Ses dosyaları indiriliyor (Google TTS)...');
    const audioFiles = [];
    try {
        for (let i = 0; i < narrationSegments.length; i++) {
            const filePath = await downloadTTS(narrationSegments[i], i);
            audioFiles.push(filePath);
            console.log(`   - Bölüm ${i + 1}/${narrationSegments.length} indirildi.`);
            // Add a small delay to be nice to the API
            await new Promise(r => setTimeout(r, 500));
        }
    } catch (error) {
        console.error('❌ Ses indirme hatası:', error.message);
        return;
    }

    // 2. Concatenate audio files
    console.log('\n🎵 Ses dosyaları birleştiriliyor...');
    // Create a list file for ffmpeg
    const listFilePath = path.join(__dirname, 'audio_list.txt');
    const listContent = audioFiles.map(f => `file '${f.replace(/\\/g, '/')}'`).join('\n');
    fs.writeFileSync(listFilePath, listContent);

    try {
        await execPromise(`ffmpeg -f concat -safe 0 -i "${listFilePath}" -c copy "${finalAudioPath}" -y`);
        console.log('✅ Ana ses dosyası oluşturuldu:', finalAudioPath);
    } catch (error) {
        console.error('❌ Ses birleştirme hatası:', error.message);
        return;
    }

    // 3. Merge with video
    console.log('\n🎬 Video ve ses birleştiriliyor...');
    // Using -shortest to ensure video matches audio length roughly
    const mergeCmd = `ffmpeg -i "${videoPath}" -i "${finalAudioPath}" -c:v libx264 -c:a aac -shortest "${outputPath}" -y`;

    try {
        await execPromise(mergeCmd);
        console.log('\n✅ Yüksek kaliteli Türkçe demo videosu hazır!');
        console.log('📁 Çıktı dosyası:', outputPath);
    } catch (error) {
        console.error('❌ Video birleştirme hatası:', error.message);
    }

    // Cleanup temp files
    console.log('\n🧹 Geçici dosyalar temizleniyor...');
    audioFiles.forEach(f => {
        if (fs.existsSync(f)) fs.unlinkSync(f);
    });
    if (fs.existsSync(listFilePath)) fs.unlinkSync(listFilePath);
}

createHighQualityDemo().catch(console.error);
