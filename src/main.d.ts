declare module "spectacle" {
    export var Spectacle: any;
    export var Deck: any;
}

declare module "spectacle/lib/themes/default" {
    var createTheme: any;
    export default createTheme;
}

interface ICodeSlideProps {
    transition: any[];
    lang: string;
    code: string;
    ranges: any[]
}

declare module "spectacle-code-slide" {
    interface ICodeSlideProps {
        transition: any[];
        lang: string;
        code: string;
        ranges: any[]
    }
    export class CodeSlide extends React.Component<ICodeSlideProps, any> {}
}
