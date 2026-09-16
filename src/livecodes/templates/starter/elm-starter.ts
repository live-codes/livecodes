import type { Template } from '../../models';

export const elmStarter: Template = {
  name: 'elm',
  title: window.deps.translateString('templates.starter.elm', 'Elm Starter'),
  thumbnail: 'assets/templates/elm.svg',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: '',
  },
  style: {
    language: 'css',
    content: `
.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 100px;
}
`.trimStart(),
  },
  script: {
    language: 'elm',
    content: `
module Main exposing (main)

import Browser
import Html exposing (Html, button, div, h1, img, p, span, text)
import Html.Attributes exposing (alt, class, id, src)
import Html.Events exposing (onClick)


type alias Model =
    Int


type Msg
    = Increment


update : Msg -> Model -> Model
update msg model =
    case msg of
        Increment ->
            model + 1


view : Model -> Html Msg
view model =
    div [ class "container" ]
        [ h1 []
            [ text "Hello, "
            , span [ id "name" ] [ text "Elm" ]
            , text "!"
            ]
        , img [ class "logo", alt "logo", src "{{ __livecodes_baseUrl__ }}assets/templates/elm.svg" ] []
        , p []
            [ text "You clicked "
            , span [ id "counter" ] [ text (String.fromInt model) ]
            , text " times."
            ]
        , button [ id "counter-button", onClick Increment ]
            [ text "Click me" ]
        ]


main : Program () Model Msg
main =
    Browser.sandbox { init = 0, update = update, view = view }
`.trimStart(),
  },
};
