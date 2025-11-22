module Api
  module V1
    class DoctorsController < ApplicationController
      def index
        doctors = Doctor.all
        render json: doctors
      end

      def create
        doctor = Doctor.new(doctor_params)
        if doctor.save
          render json: doctor, status: :created
        else
          render json: doctor.errors, status: :unprocessable_entity
        end
      end

      private

      def doctor_params
        params.require(:doctor).permit(:name, :specialty)
      end
    end
  end
end
