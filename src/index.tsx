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

function loadConfig(cb: (files: IFile[]) => void) {
  $.ajax({
    url: "./config/slides.json",
    dataType: "json",
    success: (response) => cb(response),
    error: (e) => console.log(e)
  });
}

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
loadConfig((files) => {
    init(files);
});
