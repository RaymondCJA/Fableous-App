## README

This app was made as a project for ASD students to use in classrooms to promote communicative and collabprative skills for long term benefits.

##### <div align="right">*Cite or git this project must have a reference*</div>

### Homepage：

[Fableous-Homepage(index)](https://s4523761-fableous.uqcloud.net/index/index.php)

#### Other pages (need to login)：

[Canvas (Drawing)](https://s4523761-fableous.uqcloud.net/index/Canvas/index.php)

[Canvas (Writing)](https://s4523761-fableous.uqcloud.net/index/Canvas/textStory.php)

[Class Library](https://s4523761-fableous.uqcloud.net/index/Canvas/library.php)

[Homepage (for student)](https://s4523761-fableous.uqcloud.net/index/Canvas/home.php)

[Teacher](https://s4523761-fableous.uqcloud.net/index/Canvas/teacher.php)

### Main Features Implemented

#### 1. Homepage:

- signup: inputs (email, password, confirm password, select role: teacher/student).
- login: student login to student's homepage, teacher login to teacher page.

#### 2. Student Homepage:

- add story: choose role,
  - painter: enter to the Canvas Painter page.
  - storyteller: enter to the Canvas Story teller page.
- library: enter to the class library exposed to all students.

##### 2.1 Canvas pages (shared):

- Painter page: a shared drawing canvas.
  - line: draw different color/size lines.
  - eraser: erase function, can adjust size.
  - shapes: draw different color/size shapes.
    - rectangle: draw a rectangle
    - triangle: draw a triangle
    - circle: draw a circle
    
  - fill: fill color.
  - color panel: select color,  the color of the color panel will change based on the chosen color.
  - clear: clear the canvas.
- Story Teller page: a shared texting canvas.
  - text: add text.
  - eraser: erase function, can adjust size.
  - color panel: select color,  the color of the color panel will change based on the chosen color.
  - add page and switch page: add new page and switch between the pages. 
  - submit: submit the story.

##### 2.2 Class Library

* search: search the book(s) by author's name.
* browsing book:
  * Listen to the story: listen the story of the picture.
  * rename: rename the book.
  * delete: delete the book.

#### 3. Teacher Portal

In the teacher's page, teacher can also edit the book as the functions that in the student's class library(rename, delete, close)

* class library: the story(-ies) of the class.
* waiting approval: the story(-ies) which is/are waiting to be approved.
  
  * approve: approve the story.
* approved: the approved story(-ies).
  
  * unapprove: unapprove the story. 
* students: the list of students
  
  * add students: add new student
  
  (Now, the student list is just a static list, does not connect to the database due to the limit of time. That a basic implement of static data, once it is connect to the database, we can implement that in similar way.)

<div align="right">Oct/29/2020</div>