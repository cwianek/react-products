import smtplib
import ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

port = 465  # For SSL
password = '"L492H\kmuP@Yu"p'

sender_email = "planneroutfit@gmail.com"
receiver_email = "preferujeanalny@gmail.com"

message = MIMEMultipart("alternative")
message["Subject"] = "Password recovery"
message["From"] = sender_email
message["To"] = receiver_email


def send_email():
    context = ssl.create_default_context()
    part2 = MIMEText(get_message("adam"), "html")
    message.attach(part2)

    with smtplib.SMTP_SSL("smtp.gmail.com", port, context=context) as server:
        server.login("planneroutfit@gmail.com", password)
        # TODO: Send email here
        server.sendmail(sender_email, receiver_email, message.as_string())


def get_message(name):
    return f"""
        <html>
        <body>
            <p>Hi,<br>
            How are you {name} ?<br>
            <a href="http://www.realpython.com">Real Python</a> 
            has many great tutorials.
            </p>
        </body>
        </html>
        """
