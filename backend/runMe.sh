#!/bin/bash/

if [[ "$VIRTUAL_ENV" != "" ]]
then
source venv/bin/activate
fi

pip3 install -r requirements.txt
export FLASK_APP=app.py


flask run -p 3000