## Fableous


## What is it?
This app was made as a project for ASD students to use in classrooms to promote communicative and collaborative skills for long term benefits.

## Installation

Fork/clone to your project directory:

```sh
git clone `forkedRepoName`
```
#### Installing on a localhost server

1. Use XAMPP (or other similar applications) to start a local *apache* server and **mysql** database server. XAMPP can downloaded here [Xampp download](https://www.apachefriends.org/download.html)

2. Then import the **fableous.sql** (out of the *'index'* folder) into the the localhost's *mysql* server using phpmyadmin (or other similar methods). 

   If there are some database errors shown in any of the pages in the app, you will need to change the password to ""(empty) in the related php code for affected pages.

3. The **root folder** of the webapp-Fableous is **'index'** folder, ensure that it is on the apache *document root* folder. 

   Just copy or move the **index** folder to the *htdocs* on your computer's local server.

4. For the *websocket* server, you should install **node.js** and its package - **ws** (websocket). A great guide for installing *node.js* exists on the the official website for nodejs [Node.js.org](https://nodejs.org/en/)

   Then start **server.js** (out of the *'index'* folder) as a local websocket server (the default port on localhost is 8080) : 

   ```bash
   npm install ws -g // install 'ws' globally by npm, or only for current user without '-g'
   node server.js // start the server
   ```

After that, the website can be accessed with ['localhost/index/index.php'](localhost/index/index.php). 

In the homepage, *test accounts/passwords and quick login portal* are on the **bottom-right** of the page (you might need to scroll to the bottom). This is only used for testing by developer, and should not appear in production deployments. You can delete this in the *'index/index.php'*.


### Main Features Implemented

#### 1. Homepage:

- Signup: (email, password, confirm password, selection of role: teacher/student).
- Login: Students and Teachers are able to log into their respective views through separate UIs.

#### 2. Student Homepage:

- Add story: choose role,
  - Painter: enter the Canvas Painter page.
  - Storyteller: enter the Canvas Storyteller page.
- library: enter the class library (shared between all students).

##### 2.1 Canvas pages (shared):

- Painter page: a shared drawing canvas.
  - line: draw different color/size lines.
  - eraser: erase function, size can be adjusted.
  - shapes: draw different color/size shapes.
    - rectangle: draw a rectangle
    - triangle: draw a triangle
    - circle: draw a circle
    
  - fill: fill color.
  - color panel: select color, the color of the color panel will change based on the chosen color.
  - clear: clear the canvas.
- Storyteller page: a shared typing canvas.
  - text: add text.
  - eraser: erase function (size of eraser is customisable).
  - color panel: select color,  the color of the color panel will change based on the chosen color.
  - add page and switch page: add a new page and switch between pages of a story. 
  - submit: submit the story to the class library (will require approval from a teacher before publishing).

##### 2.2 Class Library

* search: search book(s) by author's name.
* browsing books:
  * Listen to the story: listen (text to speech) to the story of the picture.
  * rename: rename the book.
  * delete: delete the book.

#### 3. Teacher Portal

In the teacher's page, teachers can also edit books with the functions that are available in the student's class library(rename, delete, close)

* class library: the story(-ies) of the class.
* waiting approval: the story(-ies) which is/are waiting to be approved.
  
  * approve: approve the story.
* approved: the approved story(-ies).
  
  * unapprove: unapprove the story. 
* students: the list of students
  
  * add students: add new student


## Licensing/Can I use this project?
Please go ahead, the code is entirely open source.