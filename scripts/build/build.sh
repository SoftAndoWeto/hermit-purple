#!/bin/bash

KEY_PATH="$HOME/.tauri/hermit-purple.key"

if [ ! -f "$KEY_PATH" ]; then
  echo "Ошибка: файл ключа не найден по пути $KEY_PATH"
  exit 1
fi

export TAURI_SIGNING_PRIVATE_KEY=$(cat "$KEY_PATH")

read -s -p "Введите пароль от ключа: " KEY_PASSWORD
echo

export TAURI_SIGNING_PRIVATE_KEY_PASSWORD="$KEY_PASSWORD"

yarn tauri build
