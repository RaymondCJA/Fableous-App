###  <div align=center>Fableous quick start guide</div>


#### 1. Online (uq zone):

The homepage of [Fableous](https://s4523761-fableous.uqcloud.net/index/index.php) demo is on the uq zone. 

https://s4523761-fableous.uqcloud.net/index/index.php

Account/password for the demo:

+ teacher/teacher: for teachers
+ student/student: for students
+ test/test: for developers



#### 2. Localhost server

1. Can use XAMPP (or other applications) to start a local *apache* server and **mysql** database server. XAMPP can download from its official website [Xampp download](https://www.apachefriends.org/download.html)

2. Then import the **fableous.sql** (out of the *'index'* folder) into the the localhost's *mysql* server by phpmyadmin or other methods. 

   If there are some database errors alerted in pages, these pages need to change the password to ""(empty) in the related php code.

3. The **root folder** of the webapp-Fableous is **'index'** folder, ensure it is on the apache *document root* folder. 

   Just copy or move the **index** folder to the *htdocs* on your computer's local server.

4. In terms of the *websocket* server, you should install **node.js** and its package - **ws** (websocket). A great guide can follow to install *node.js* is the official website [Node.js.org](https://nodejs.org/en/)

   Then start **server.js** (out of the *'index'* folder) as a local websocket server (the default port on localhost is 8080) : 

   ```bash
   npm install ws -g // install 'ws' globally by npm, or only for current user without '-g'
   node server.js // start the server
   ```

After that, the website could be access by ['localhost/index/index.php'](localhost/index/index.php). 

In the page, *test accounts/passwords and quick login portal* are on the **bottom-right** of the page (might need to scroll to the bottom). This is only used for test for developer, and should not appear in the formal product. You can delete it in the *'index/index.php'*.



#### 3. Experimental features:

The online demo has *"redo/undo"* functions (experimental) on **Canvas: painter**, but for stability, these functions' code are commented in the source code (as they have some bugs). 

If you wanna try the features, just uncomment the related code in: 

+ index/Canvas/js/sync.js: line 78-85 (function *dodo*), 139-145 (sendMessage(no=15/20))
+ index/Canvas/index.php: line 188 (import 'undo.js')
+ index/Canvas/js/script.js: line 250 (execute saveHistory() function)

+ index/Canvas/textStory.php: line 223 (import 'undo.js'), not implement in this page, but import it to prevent alerting errors.

Then refresh the whole project in browser, in the **Fableous-painter** page, you can test 'redo' or 'undo' features.