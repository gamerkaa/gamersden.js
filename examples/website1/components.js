/* Components for the webpage are defined here */
var webpage = {
    heading: "",
    paragraph: "",
    layoutSize: 'small',
    makePage: function (heading, paragraph) {
        this.heading = heading;
        this.paragraph = paragraph;
        layout.makeDiv("intro",document.body,
            '.big { display: block; width: 1280px; }\
            .small { display: block; width: 640px; }\
            .hidden { display: none; }\
            .introduction {\
                margin: 10px auto;\
            }\
            .introduction h2 {\
                text-align: center;\
                text-decoration: underline;\
            }\
            .introduction p {\
                font-family: helvetica;\
                font-size: 16px;\
                line-height:1.5em;\
                text-align: justify;\
            }\
            .form-buttons {\
                text-align: center;\
            }',
            'introduction ' + webpage.layoutSize,
            NO_ATTRIBUTES,
            NO_EVENTS
        );
        webpage.updatePage(this.heading, this.paragraph, this.layoutSize);
    },
    updatePage: function(heading, paragraph, styling) {
        this.heading = heading;
        this.paragraph = paragraph;
        this.layoutSize = styling;
        layout.updateDiv("intro", 'introduction ' + webpage.layoutSize, NO_ATTRIBUTES, NO_EVENTS,
            elements.makeElement('h2', '', NO_ATTRIBUTES, NO_EVENTS,
                elements.makeText(heading)
            ),
            elements.makeElement('p', '', NO_ATTRIBUTES, NO_EVENTS,
                elements.makeText(paragraph)
            ),
            elements.makeElement('form','form-buttons', NO_ATTRIBUTES, NO_EVENTS,
                elements.makeElement('button','',
                    { type: "button" },
                    { onclick: function () { webpage.updatePage(webpage.heading, webpage.paragraph, 'small'); } },
                    elements.makeText("Small View")
                ),
                elements.makeElement('button','',
                    { type: "button" },
                    { onclick: function () { webpage.updatePage(webpage.heading, webpage.paragraph, 'big'); } },
                    elements.makeText("Big View")
                )
            )
        );
    }
}
