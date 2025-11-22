Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :doctors, only: [:index, :create]
      resources :patients, only: [:index, :create]
      resources :appointments, only: [:index, :create]
    end
  end
end
