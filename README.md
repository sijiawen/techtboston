# ReCALL

## Inspiration
If 2020 taught us anything, it's that time is fleeting. This year has been an unprecedented one for all of us, but it has also been one to remember. We were inspired by the idea of memories and messages. Not only we can hold on to them like a time capsule, but we can use that to inspire and encourage our future selves.

## What it does
What if you could send a message to your future self? What would you say? What would you want to remember?

"Dear Future Me." I have something to tell you in the year 3000.

This is ReCALL. 

## How we built it

**Pages**

- Landing Page - the user can log in with their user name and password to access their account, or set up a new account
- Message Submission - the user can type their message of choice, along with the date that they want to receive their email in the future
- Profile Page - the user can see all the emails they've sent themselves, both opened ones and ones to expect in the future

**Front End**

- HTML/CSS/Bootstrap
- [Flaticon](https://www.flaticon.com/) and [Undraw](https://undraw.co/) for the assets

**Back End**

- Firebase - We set up Firebase project that was linked to MailTrack, an email testing tool
- Nodemailer - We used Nodemailer, a simple tool to help us send emails through node.js. This triggered our Firebase Cloud function. 
- Node - We used node to build the email function, by passing variables submitted by the user into our function, “Send Form”. This was triggered when the user clicked on the Submit button in the form.

## Challenges we ran into
The biggest challenge was being able to communicate and store information in the servers. We used Google Firebase and Cloud Firestore, but it was extremely difficult because I kept getting a "download JDK error". Unfortunately, Java is no longer in the public domain (you have to download it from Oracle and register an account). This was an extremely frustrating process and we ultimately decided to switch gears.

## Accomplishments that we're proud of
Our biggest accomplishment was finally connecting the front end to the back end. After clicking the submit button, the user is able to send the email. We used GET and POST to trigger the function to send the email, where we passed variables with the user's submitted information.

## What we learned
I have never had any experience doing the backend prior to this. Node.js, Firebase, Repl.it hosting... all of this was brand new.

## What's next for ReCall
One thing that we weren't able to do was store the user's information in a server. That way, it could be sent at a later date. We also want to be able to finalize the user's login authentication details, using a unique email and password.

