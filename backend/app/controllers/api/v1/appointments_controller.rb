module Api
  module V1
    class AppointmentsController < ApplicationController
      def index
        appointments = Appointment.includes(:doctor, :patient).all
        render json: appointments.as_json(include: { doctor: { only: [:name, :specialty] }, patient: { only: [:name, :email] } })
      end

      def create
        appointment = Appointment.new(appointment_params)
        if appointment.save
          render json: appointment, status: :created
        else
          render json: appointment.errors, status: :unprocessable_entity
        end
      end

      private

      def appointment_params
        params.require(:appointment).permit(:doctor_id, :patient_id, :appointment_date)
      end
    end
  end
end
