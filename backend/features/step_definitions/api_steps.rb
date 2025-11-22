Given('the following doctors exist:') do |table|
  table.hashes.each do |hash|
    Doctor.create!(hash)
  end
end

Given('the following patients exist:') do |table|
  table.hashes.each do |hash|
    Patient.create!(hash)
  end
end

When('I send a GET request to {string}') do |path|
  puts "Doctor count before request: #{Doctor.count}"
  get path
end

When('I send a POST request to {string} with the following:') do |path, body|
  post path, params: JSON.parse(body)
end

Then('the response status should be {int}') do |status|
  expect(response.status).to eq(status), "Expected #{status}, got #{response.status}. Body: #{response.body}"
end

Then('the response should contain {int} doctors') do |count|
  json = JSON.parse(response.body)
  expect(json.length).to eq(count)
end

Then('the first doctor\'s name should be {string}') do |name|
  json = JSON.parse(response.body)
  expect(json.first['name']).to eq(name)
end

Then('the response should contain the doctor {string}') do |name|
  json = JSON.parse(response.body)
  expect(json['name']).to eq(name)
end

Then('the response should contain the appointment date {string}') do |date|
  json = JSON.parse(response.body)
  expect(json['appointment_date']).to eq(date)
end
