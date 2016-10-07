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
      error: (e) => alert(e)
    });
  });
}

// files to be loaded
let files: IFile[] = [
  {
    path: "./assets/style/sample1.js",
    loaded: false,
    code: "",
    ranges: [
      {
        loc: [0, 0], title: "IMPERATIVE",
        note: "This example of imperative programming is efficient but highly-coupled, hard to test and hard to re-use!"
      },
      { loc: [0, 13], note: "We need to calculate hte AVG of the AVG" },
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
      { loc: [0, 0], title: "IMPERATIVE + LAMBDA" },
      { loc: [0, 13], note: "We need to calculate hte AVG of the AVG" }
    ]
  },
  {
    path: "./assets/style/sample3.js",
    loaded: false,
    code: "",
    ranges: []
  },
  {
    path: "./assets/style/sample4.js",
    loaded: false,
    code: "",
    ranges: []
  },
  {
    path: "./assets/style/sample5.ts",
    loaded: false,
    code: "",
    ranges: []
  },
  {
    path: "./assets/types/sample1.ts",
    loaded: false,
    code: "",
    ranges: []
  },
  {
    path: "./assets/types/sample2.ts",
    loaded: false,
    code: "",
    ranges: []
  },
  {
    path: "./assets/types/sample3.ts",
    loaded: false,
    code: "",
    ranges: []
  }
];

// init app
init(files);
