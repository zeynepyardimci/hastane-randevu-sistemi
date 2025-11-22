# Clear existing data
Appointment.destroy_all
Doctor.destroy_all
Patient.destroy_all

# Create Doctors
d1 = Doctor.create!(name: "Dr. Gregory House", specialty: "Diagnostic Medicine")
d2 = Doctor.create!(name: "Dr. Meredith Grey", specialty: "General Surgery")
d3 = Doctor.create!(name: "Dr. John Dorian", specialty: "Internal Medicine")

# Create Patients
p1 = Patient.create!(name: "John Doe", email: "john@example.com")
p2 = Patient.create!(name: "Jane Smith", email: "jane@example.com")

# Create Appointments
Appointment.create!(doctor: d1, patient: p1, appointment_date: 1.day.from_now)
Appointment.create!(doctor: d2, patient: p2, appointment_date: 2.days.from_now)

puts "Seeded #{Doctor.count} doctors, #{Patient.count} patients, and #{Appointment.count} appointments."
