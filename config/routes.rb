Rails.application.routes.draw do
  devise_for :users
  resources :users, only: [:edit, :update]
  resources :messages
  root to: 'messages#index'
end