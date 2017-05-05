Spending App - Capital One Investing Coding Challenge
=====================================================

Hello!

If you are reading this, then you are probably reviewing my code. I hope you enjoy it. :)

##The Story

The problem given to me was that a customer wants to view their aggregate monthly spending, as well as their average monthly budget, projected amount for the current month, and be able to filter specific types of transactions from the view--namely their donuts transactions and credit card payments.

##My solution
I decided to create a SPA. While a command line script would satisfy the requirements of this challenge, I viewed this story as coming from an end user, who of course would want to interact with a webpage, not a command line. Now the challenge with a SPA and interacting with an API is that it is bad practice to expose API keys to the client, so this meant I also needed to create a backend that would serve the static files and process the calls to the API. I created the backend using Node and the frontend using AngularJS. Is it overkill for an app of this size? Probably. But since Capital One Investing uses AngularJS and Node (among other frameworks and languages), I figured it wouldn't hurt to demonstrate my proficiency in this area.

Doing this sort of hybrid SPA also allowed me to offload some of the data processing required of the client to the server. I chose to take a balanced approach to this: the server accepts the data from the API and aggregates it into each unique year-month, which it then delivers as an object to the client for further processing into a sorted array before the data is displayed. While this code is not perfectly efficient, I did want to take into consideration the efficiency of this data processing--most of my functions have a Big O of O(n), although with the sort on the client side it means that at best this code has a Big O of O(n log n).

Also just as in important, I kept in mind three things when crafting my solution:
+ Readability
+ Extensibility
+ Testability

###Readability
I use `eslint` across my code and strive for consistent styling. I aim to have my code meet the standards of the Clean Code book, although I know there is room for improvement.

###Extensibility
Particularly for the frontend, I wanted to demonstrate that this code was easily and quickly extensible to meet any new requirements. I used a component-based architecture for my AngularJS code which allows elements to be easily re-used and new elements to be quickly added with the least amount of editing to previously written code.

The backend also keeps to this by using modules and separating out the code into as discrete, single-purpose pieces as is reasonable.

###Testability
First, you will notice a few tests were written, but this solution has by no means complete test coverage. Not even close. I ran out of time to do all the testing I would usually do, but I at least wanted to demonstrate a cognizance of testing, particularly unit testing. In line with this code being extensible, the component-based architecture also allows for easy unit testing.

You can run the current few tests with these commands:
+*Test the Backend*
```
yarn test-be
```
+*Test the Frontend*
```
yarn test-fe
```

##One More Note!
You may notice some references to JSON web tokens, bearer and basic auth, etc. I didn't actually implement a login feature for this app, especially considering that we are hardcoding the user token and auth and not creating any sort of user database. But again, I wanted to demonstrate a cognizance of this and also show that one could quickly and easily extend the current code base to have a token-based auth/login.

##Let's Run This!
To get started, clone the repo to your local drive. I am using yarn instead of npm, but using npm shouldn't be an issue (usually...until it is).

I also am using a .env file to handle variables such as the API and AUTH tokens. You can add these directly into your environmental variables, but I highly recommend using a .env. So, from the root of your clone repo:
```
touch .env
```

In the .env file, add the following:
```
API_TOKEN=XXX
USER_ID=XXX
AUTH_TOKEN=XXX
LEVEL_URL=https://2016.api.levelmoney.com/api/v2/core
BACKEND_PORT=3000
API_URL=http://localhost
```
Replacing the `XXX` with the appropriate variables from the API.

For the sake of simplicity (and to avoid any unforeseen Webpack snafus), I added the build files to the git repository, although I usually wouldn't do that. If you do want to build my project from scratch, feel free to using the following command:
```
yarn build
```
Otherwise, you can just spin up the server and start playing with it:
```
yarn start
```

And there you go! I hope you like it and I look forward to chatting with you and the rest of the Capital One Investing team in-person quite soon!!

Have a great day!
