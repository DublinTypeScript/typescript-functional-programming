/// <reference path="main.d.ts" />

import * as React from "react";
import { Spectacle, Deck } from "spectacle";
import * as SpectacleCodeSlide from "spectacle-code-slide";
import createTheme from "spectacle/lib/themes/default";
import { render } from "react-dom";
import * as $ from "jquery";

var CodeSlide: any = SpectacleCodeSlide;

// Theme
const theme = createTheme({
  primary: 'white',
  quartenary: '#122b45'
});

// Contracts
interface IRange {
  loc: number[];
  title?: string;
  note?: string;
}

interface IFile {
  path: string;
  loaded: boolean;
  code: string;
  ranges: IRange[];
}

interface IPresentationProps {
  files: IFile[];
}

// All files loaded?
function checkAllFilesLoaded(files: IFile[]) {
  return !files.some((f) => f.loaded === false);
}

// Used to provide renderApp via closure
function makeOnSuccess(renderApp: (files: IFile[]) => void) {

  
  return function (i: number, response: string, files: any[]) {

    // flag file as loaded
    files[i].loaded = true;
    files[i].code = response;
  
    // invoke renderApp if all files loaded
    if (checkAllFilesLoaded(files) === true) {
      renderApp(files);
    }
  }

}

class Presentation extends React.Component<IPresentationProps, void> {

  public render() {
    return (
      <Spectacle theme={theme}>
        <Deck transition={[]} transitionDuration={0} progress="bar">
          {this._renderSlides(this.props.files)}
        </Deck>
      </Spectacle>
    );
  }

  // map IFile[] => CodeSlide[]
  private _renderSlides(files: IFile[]): JSX.Element[] {
    return files.map((file, index) => {
      return this._renderSlide(file, index);
    });
  }

  // map IFile => CodeSlide
  private _renderSlide(file: IFile, index: number): JSX.Element {
    return (
      <CodeSlide
            key={index}
            transition={[]}
            lang="js"
            code={file.code}
            ranges={file.ranges}
        />
    );
  }

}

// Render App
let onSuccess = makeOnSuccess((files: IFile[]) => {

  // rende to DOM
  render(<Presentation files={files} />, document.getElementById("main"));

});

// load files and render application
function init(files: IFile[]) {
  files.forEach((file, i, files) => {
    $.ajax({
      url: file.path,
      dataType: "text",
      success: (response) => onSuccess(i, response, files),
      error: (e) => console.log(e)
    });
  });
}

// files to be loaded
let files: IFile[] = [
  {
    path: "./assets/types/sample1.ts",
    loaded: false,
    code: "",
    ranges: [
      {
        loc: [0, 0], title: "THE TYPE SYSTEM IS A LIAR!",
        note: "Referential transparency can only be guaranteed by a powerful type system"
      },
      { loc: [0, 5], note: "This function is used to ilustrate some kind of side effect" },
      { loc: [4, 9], note: "Just declaring a basic User interface " },
      {
        loc: [8, 20],
        note: `A function used to fetch a list of users from the server.
              Based on the type of the return of this function, it looks like 
              it returns a list of users.`
      },
      {
        loc: [19, 22],
        note: `The reality is that the type system is lying to
               us and sometimes it will not return due to some
               side effect. We cannot guarantee referential transparency 💩`
      },
    ]
  },
  {
    path: "./assets/types/sample2.ts",
    loaded: false,
    code: "",
    ranges: [
      {
        loc: [0, 0], title: "ALGEBRAIC DATA TYPES TO THE RESCUE!",
        note: `In computer programming, more so functional programming and type theory,
               an algebraic data type is a kind of composite type, i.e., a type formed
               by combining other types.`
      },
      { loc: [0, 5], note: "This function is used to ilustrate some kind of side effect" },
      { loc: [4, 9], note: "This interface is used to represent the non-existance of a value" },
      { loc: [8, 13], note: "This interface is used to represent the existance of a value" },
      { loc: [12, 20], note: "This interface is used to represent the existance or non-existance of a value" },
      { loc: [19, 24], note: "This class is used to represent the non-existance of a value" },
      { loc: [23, 31], note: "This class is used to represent the existance of a value" },
      { loc: [30, 53], note: "This class is used to represent the existance or non-existance of a value" },
      { loc: [52, 57], note: "Just declaring a basic User interface" },
      {
        loc: [56, 68],
        note: `A function used to fetch a list of users from the server.
              Based on the type of the return of this function, it looks
              like it may o may not return a list of users.`
      },
      {
        loc: [67, 71],
        note: `This time the type system is not lying to us and we can
               be sure that the function will always return a Maybe<User[]>.
               We can guarantee referential transparency! But we have 
               created a lot of boilerplate 💩. We could use a library
               but (e.g. https://github.com/ramda/ramda-fantasy) we can 
               also use the TypeScript type system!`
      }
    ]
  },
  {
    path: "./assets/types/sample3.ts",
    loaded: false,
    code: "",
    ranges: [
      {
        loc: [0, 0], title: "TYPESCRIPT SUPER POWERS!",
        note: `In the last example we created a lot of boilerplate.
               We could use a library but we can also use the 
               TypeScript type system!`
      },
      { loc: [0, 5], note: "This function is used to ilustrate some kind of side effect" },
      { loc: [4, 9], note: "Just declaring a basic User interface" },
      { loc: [8, 11], note: "We can declare the generic type Maybe<T> as the union of undefined and the generic type T." },
      {
        loc: [10, 20],
        note: `A function used to fetch a list of users from the server.
              Based on the type of the return of this function, it looks
              like it may o may not return a list of users.`
      },
      {
        loc: [19, 23],
        note: `This time the type system is not lying to us and we can
               be sure that the function will always return a Maybe<User[]>.
               We can guarantee referential transparency and we have used
               minimal boilerplate and no libraries 🚀. Just the TypeScript type system!
               NOTE: This example requires the --strictNullChecks compilation flag.`
      }
    ]
  },
  {
    path: "./assets/style/sample1.js",
    loaded: false,
    code: "",
    ranges: [
      {
        loc: [0, 0], title: "IMPERATIVE PROGRAMMING IS YOUR ENEMY!",
        note: "This example of imperative programming is efficient but highly-coupled, hard to test and hard to re-use! 💩"
      },
      { loc: [0, 13], note: "We need to calculate the AVG of the AVG" },
      { loc: [12, 19], note: "First we calculate the total score" },
      { loc: [18, 21], note: "Then we calculate the AVG score" },
      { loc: [20, 30], note: "Then we find time spent studyng by students with AVG score" },
      { loc: [29, 36], note: "Then we calculate the total time spent studyng by students with AVG score" },
      { loc: [35, 38], note: "Finally, we calculate the AVG time spent studyng by students with AVG score" }
    ]
  },
  {
    path: "./assets/style/sample2.js",
    loaded: false,
    code: "",
    ranges: [
      {
        loc: [0, 0], title: "MOSTLY IMPERATIVE PROGRAMMING IS NOT GOOD ENOUGH!",
        note: `This example of imperative programming is inefficient but highly-coupled, 
              hard to test and hard to re-use! 💩 This example uses an style that 
              is much more imperate than functional.`
      },
      { loc: [0, 13], note: "We need to calculate the AVG of the AVG" },
      { loc: [12, 16], note: "First we calculate the total score" },
      { loc: [15, 18], note: "Then we calculate the AVG score" },
      { loc: [17, 21], note: "Then we find time spent studyng by students with AVG score" },
      { loc: [20, 23], note: "Then we calculate the total time spent studyng by students with AVG score" },
      { loc: [22, 25], note: "Finally, we calculate the AVG time spent studyng by students with AVG score" }
    ]
  },
  {
    path: "./assets/style/sample3.js",
    loaded: false,
    code: "",
    ranges: [
      {
        loc: [0, 0], title: "MOSTLY FUNCTIONAL PROGRAMMING IS NOT GOOD ENOUGH!",
        note: `This example of imperative/funcitonal programming is inefficient buta bit less coupled, 
               and a bit less hard to test and a bit easier to re-use. However, this example uses an style that 
               is more imperate than functional.`
      },
      { loc: [0, 3], note: "We have extracted the arguments of filter, map ad reduce as functions" },
      { loc: [2, 7], note: "We have also declared some re-usable functions to perform some of the required logic" },
      { loc: [6, 20], note: "We need to calculate the AVG of the AVG" },
      { loc: [19, 23], note: "First we calculate the total score" },
      { loc: [22, 25], note: "Then we calculate the AVG score" },
      { loc: [24, 29], note: "Then we find time spent studyng by students with AVG score" },
      { loc: [28, 31], note: "Then we calculate the total time spent studyng by students with AVG score" },
      { loc: [30, 33], note: "Finally, we calculate the AVG time spent studyng by students with AVG score" }
    ]
  },
  {
    path: "./assets/style/sample4.js",
    loaded: false,
    code: "",
    ranges: [
      {
        loc: [0, 0], title: "PURELY FUNCTIONAL PROGRAMMING IS AWESOME!",
        note: `This example of purely funcitonal programming is inefficient but not coupled,
               secure and easy to test and re-use 🚀. We don't need to worry about it being
               inefficient because we could use "Transducers" (http://bit.ly/2dzKnwp) to make 
               it faster than the imperative exmaple. NOTE: We will skip transducers for simplicity
               in this demo.`
      },
      { loc: [0, 5], note: "Declare filter map and reduce as functions in away that allow as to compose them and a composition helper" },
      { loc: [4, 14], note: "Declare some re-usable functions" },
      { loc: [13, 21], note: "Declare some functions to map and filter the exam results data structure" },
      { loc: [20, 34], note: "Did you notice how until this point we have only declared functions? 😎" },
      {
        loc: [33, 36],
        note: `Did you notice how we implemented the whole solution mentioning 
              "examResults", the data structure that we are manipulating, only once? 😎` 
      }
    ]
  },
  {
    path: "./assets/style/sample5.ts",
    loaded: false,
    code: "",
    ranges: [
      {
        loc: [0, 0], title: "🌈 STATICALLY TYPED PURELY FUNCTIONAL PROGRAMMING 🌈",
        note: `TypeScript is a functional programming language (http://bit.ly/2dQDaac)
              We combine algebraic data types with functional programming principles
              and static types we end up generating extremely reliable code.`
      },
      { loc: [0, 5], note: "Declare filter map and reduce as functions in away that allow as to compose them and a composition helper with static types" },
      { loc: [4, 14], note: "Declare some re-usable functions with static types" },
      { loc: [13, 19], note: "Just declaring a basic IResult interface" },
      { loc: [18, 26], note: "Declare some functions to map and filter the exam results data structure. " },
      { loc: [25, 39], note: "Did you notice how until this point we have only declared functions? 😎" },
      {
        loc: [38, 41],
        note: `Did you notice how we implemented the whole solution mentioning 
              "examResults", the data structure that we are manipulating, only once? 😎`
      }
    ]
  },
  {
    path: "./assets/style/sample6.js",
    loaded: false,
    code: "",
    ranges: [
      {
        loc: [0, 0], title: "TYPESCRIPT + RAMDA",
        note: `Ramda is a practical functional library for Javascript programmers`
      }
    ]
  },
  {
    path: "./assets/reactive/rx.js",
    loaded: false,
    code: "",
    ranges: [
      {
        loc: [0, 0], title: "RXJS",
        note: `RxJS is a set of libraries to compose asynchronous and event-based programs
              using observable collections and Array#extras style composition in JavaScript`
      },
      { loc: [0, 11], note: "TODO" },
      { loc: [10, 29], note: "TODO" },
      { loc: [30, 34], note: "TODO" },
      { loc: [33, 50], note: "TODO" },
      { loc: [51, 55], note: "TODO" },
      { loc: [54, 69], note: "TODO" }
    ]
  },
  {
    path: "./assets/reactive/mobx.js",
    loaded: false,
    code: "",
    ranges: [
      {
        loc: [0, 0], title: "MOBX",
        note: `Simple, scalable state management`
      },
      { loc: [0, 4], note: "TODO" },
      { loc: [3, 13], note: "TODO" },
      { loc: [12, 20], note: "TODO" },
      { loc: [19, 34], note: "TODO" },
      { loc: [33, 44], note: "TODO" },
      { loc: [43, 46], note: "TODO" },
      { loc: [45, 48], note: "TODO" },
      { loc: [47, 55], note: "TODO" }
    ]
  },
  {
    path: "./assets/reactive/cycle.js",
    loaded: false,
    code: "",
    ranges: [
      {
        loc: [0, 0], title: "CYCLEJS",
        note: `A functional and reactive JavaScript framework for cleaner code`
      },
      { loc: [0, 3], note: "TODO" },
      { loc: [2, 20], note: "TODO" },
      { loc: [19, 22], note: "TODO" }
    ]
  }
];

// init app
init(files);
