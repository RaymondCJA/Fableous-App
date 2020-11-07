## README

This app was made as a project for ASD students to use in classrooms to promote communicative and collaborative skills for long term benefits.

##### <div align="right">*Cite or git this project must have a reference*</div>

### Homepage：

[Fableous-Homepage(index)](https://s4523761-fableous.uqcloud.net/index/index.php)

#### Other pages (login required)：

[Canvas (Drawing)](https://s4523761-fableous.uqcloud.net/index/Canvas/index.php)

[Canvas (Writing)](https://s4523761-fableous.uqcloud.net/index/Canvas/textStory.php)

[Class Library](https://s4523761-fableous.uqcloud.net/index/Canvas/library.php)

[Homepage (for students)](https://s4523761-fableous.uqcloud.net/index/Canvas/home.php)

[Teacher](https://s4523761-fableous.uqcloud.net/index/Canvas/teacher.php)

### Main Features Implemented

#### 1. Homepage:

- signup: inputs (email, password, confirm password, select role: teacher/student).
- login: student login to student's homepage, teacher login to teacher's page.

#### 2. Student Homepage:

- add story: choose role,
  - painter: enter the Canvas Painter page.
  - storyteller: enter the Canvas Story teller page.
- library: enter the class library, shared between all students.

##### 2.1 Canvas pages (shared):

- Painter page: a shared drawing canvas.
  - line: draw different color/size lines.
  - eraser: erase function, size can be adjusted.
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
  * Listen to the story: listen to the story of the picture.
  * rename: rename the book.
  * delete: delete the book.

#### 3. Teacher Portal

In the teacher's page, teachers can also edit the book with the functions that are in the student's class library(rename, delete, close)

* class library: the story(-ies) of the class.
* waiting approval: the story(-ies) which is/are waiting to be approved.
  
  * approve: approve the story.
* approved: the approved story(-ies).
  
  * unapprove: unapprove the story. 
* students: the list of students
  
  * add students: add new student
  
  (Currently the student list is just a static list and it does not connect to the database due to time constraints in project development. It is just a basic implementation of static data, but once it is connected to the database, it can be implemented in a similar way.)


