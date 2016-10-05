/// <reference path="main.d.ts" />

import * as React from "react";
import { Spectacle, Deck } from "spectacle";
import CodeSlide from "spectacle-code-slide";
import { render } from "react-dom";
import * as $ from "jquery";

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

// Render App
let onSuccess = makeOnSuccess((files: IFile[]) => {

  class Presentation extends React.Component<IPresentationProps, void> {
    public render() {
      return (
        <Spectacle>
          <Deck transition={[]} transitionDuration={0} progress="bar">
            this._renderSlides(this.props.files);
          </Deck>
        </Spectacle>
      );
    }

    // map IFile[] => CodeSlide[]
    private _renderSlides(files: IFile[]) {
      files.map((file) => this._renderSlide(file));
    }

    // map IFile => CodeSlide
    private _renderSlide(file: IFile) {
      return (
        <CodeSlide
              transition={[]}
              lang="js"
              code={file.code}
              ranges={file.ranges}
          />
      );
    }

  }

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
      { loc: [0, 270], title: "Walking through some code" },
      { loc: [0, 1], title: "The Beginning" },
      { loc: [1, 2] },
      { loc: [1, 2], note: "Heres a note!" },
      { loc: [2, 3] },
      { loc: [8, 10] }
    ]
  },
  {
    path: "./assets/style/sample2.js",
    loaded: false,
    code: "",
    ranges: []
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
