Rails.application.routes.draw do
  root to: 'messages#index'

  get 'messages' => 'messages#index'
end