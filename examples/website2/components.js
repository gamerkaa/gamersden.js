/* Components for a single web page application */
var webpage = {
    heading: "Welcome to Single Page Web Application",
    subheading: "Created by Karthik Sarangan",
    logo: "logo.png",

    menus: {
        home: { text: "Home", contents: "home", display: "base-content-video" },
        about: { text: "About", contents: "about", display: "hide-video" },
        contactus: { text: "Contact Us", contents: "contactus", display: "hide-video" },
        help: { text: "Help", contents: "help", display: "hide-video" }
    },

    selectedItemId: undefined,
    selectedVideoId: undefined,

    contents: {
        home: {
            heading: "Heading of Home page",
            videos: [],
            detail: "You are now on the content page for the home menu of the Single Page Web Application built using gamersden.js"
        },
        about: {
            heading: "Heading of About content page",
            videos: [],
            detail: "This is a single web page application written using gamersden.js"
        },
        contactus: {
            heading: "Heading of Contact Us content page",
            videos: [],
            detail: "You can find me at 'Karthik Sarangan' <karthiks_2001@yahoo.com>"
        },
        help: {
            heading: "Heading of Help content page",
            videos: [],
            detail: "Click the menus ^ to find out more about this application"
        }
    },

    divContents: null,
    divSidebarContents: null,

    makePage: function() {
        let topDiv = layout.makeDiv('webPage', document.body,
            '.base-webpage {\
                width: 800px;\
                margin: 0px auto;\
            }',
            'base-webpage',
            NO_ATTRIBUTES,
            NO_EVENTS
        );
        layout.makeDiv('header', topDiv,
            '.base-header {\
                border: 1px solid black;\
                width: 798px;\
                height: 100px;\
                margin: 0px;\
                padding: 0px;\
                float: left;\
                clear: both;\
            }\
            .base-header-logo {\
                width: 100px;\
                height: 100px;\
                float: left;\
                margin-right: 10px;\
            }\
            .base-header-heading {\
                font-family: helvetica;\
                font-size: 32px;\
                margin-top: 10px;\
            }\
            .base-header-subheading {\
                font-family: helvetica;\
                font-size: 16px;\
                margin-bottom: 0px;\
            }',
            'base-header',
            NO_ATTRIBUTES,
            NO_EVENTS
        );
        this.updatePageHeader();
        let menuDiv = layout.makeDiv('menubar', topDiv,
            '.base-menubar {\
                border: 1px solid black;\
                width: 798px;\
                height: 25px;\
                margin: 0px;\
                padding: 0px;\
                background-color: blue;\
                text-align: center;\
                float: left;\
            }\
            .base-menubar-item {\
                width: 197px;\
                height: 23px;\
                border: 1px solid black;\
                padding: 0px;\
                margin: 0px;\
                float: left;\
                text-align: center;\
                color: yellow;\
            }\
            .base-menubar-item-text {\
                color: yellow;\
                text-decoration: underline;\
            }',
            'base-menubar',
            NO_ATTRIBUTES,
            NO_EVENTS
        );
        let i;
        for (menu in this.menus) {
            layout.makeDiv("menuitem_" + this.menus[menu].contents, menuDiv, NO_CSSBLOCK,
                'base-menubar-item',
                NO_ATTRIBUTES,
                NO_EVENTS,
                elements.makeElement('a',
                'base-menubar-item-text',
                {
                    href: "#"
                },
                {
                    onclick: function() {
                        let itemid = this.parentNode.id.replace(/^[a-zA-Z]*_/g, "");
                        webpage.updatePageContent(itemid);
                    }
                },
                    elements.makeText(this.menus[menu].text)
                )
            );
        }
        this.divContents = layout.makeDiv("content", topDiv,
            '.base-content {\
                width: 578px;\
                height: 578px;\
                margin: 0px;\
                padding: 10px;\
                border: 1px solid black;\
                float: left;\
            }\
            .base-content h3 {\
            }\
            .base-content .base-content-video {\
                width: 576px;\
                height: 325px;\
                float: left;\
                clear:both;\
                margin-bottom: 10px;\
            }\
            .base-content .hide-video {\
                display: none;\
            }\
            .base-content p {\
                text-align: justify;\
                font-family: Helvetica;\
            }',
            'base-content',
            NO_ATTRIBUTES,
            NO_EVENTS,
            elements.makeText("Base content")
        );
        this.divSidebarContents = layout.makeDiv("sidebar", topDiv,
            '.sidebar-content {\
                width: 178px;\
                height: 578px;\
                margin: 0px;\
                padding: 10px;\
                float: left;\
                border: 1px solid black;\
                text-align:center;\
            }\
            .sidebar-content .sidebar-content-heading {\
            }\
            .sidebar-content .sidebar-content-videos {\
                overflow-y: auto;\
            }\
            .sidebar-content .sidebar-content-videos a {\
                font-size: 14px;\
                font-family: Arial;\
            }',
            'sidebar-content',
            NO_ATTRIBUTES,
            NO_EVENTS,
            elements.makeText("Sidebar content")
        );

        ajax.getURL("videofiles.php", NO_GETVARS, gotVideos, error);
    },
    updatePageHeader: function(heading, subheading, logo) {
        if (heading !== undefined) this.heading = heading;
        if (subheading !== undefined) this.subheading = subheading;
        if (logo !== undefined) this.logo = logo;

        layout.updateDiv('header', NO_CSS, NO_ATTRIBUTES, NO_EVENTS,
            elements.makeElement('img', 'base-header-logo', { src: this.logo }),
            elements.makeElement('h1', 'base-header-heading', NO_ATTRIBUTES, NO_EVENTS, elements.makeText(this.heading)),
            elements.makeElement('h4', 'base-header-subheading', NO_ATTRIBUTES, NO_EVENTS, elements.makeText(this.subheading))
        );
    },
    updatePageContent: function(selectitemid, video) {
        let menu;
        let content;
        let itemid = (selectitemid === undefined ? this.selectedItemId : selectitemid);
        let videoIndex = false;

        menu = this.menus[itemid];
        content = this.contents[itemid];

        this.selectedItemId = itemid;
        for (let i = 0; i < content.videos.length; ++i) {
            if (content.videos[i] === video) {
                videoIndex = i;
                break;
            }
        }

        layout.updateDiv("content", NO_CSS, NO_ATTRIBUTES, NO_EVENTS,
            elements.makeElement('h3', NO_CSS, NO_ATTRIBUTES, NO_EVENTS,
                elements.makeText(content.heading)
            ),
            (videoIndex !== false  ?
                elements.makeElement('video', menu.display,
                {
                    width: "578",
                    height: "325",
                    border: "0",
                    controls: "required"
                }, NO_EVENTS,
                    elements.makeElement("source", NO_CSS,
                    {
                        src: encodeURI(video),
                        type: "video/mp4",
                        controls: "required"
                    },NO_EVENTS)
                )
                : elements.makeText('')),
            elements.makeElement('p', NO_CSS, NO_ATTRIBUTES, NO_EVENTS,
                elements.makeText(content.detail)
            )
        );
        this.updatePageSidebar(itemid);
    },
    updatePageSidebar: function(itemid) {
        let sidebarElement = this.divSidebarContents;
        let sidebarVideosElement = undefined;
        let content;
        let i, count;

        menu = this.menus[itemid];
        content = this.contents[itemid];

        layout.updateDiv("sidebar", NO_CSS, NO_ATTRIBUTES, NO_EVENTS,
            layout.makeDiv("sidebar_heading", sidebarElement, NO_CSSBLOCK, 'sidebar-content-heading', NO_ATTRIBUTES, NO_EVENTS,
                elements.makeElement("h3", NO_CSS, NO_ATTRIBUTES, NO_EVENTS,
                    elements.makeText("Gameplays")
                )
            ),
            sidebarVideosElement = layout.makeDiv("sidebar_videos", sidebarElement, NO_CSSBLOCK, 'sidebar-content-videos', NO_ATTRIBUTES, NO_EVENTS)
        );

        if (content["videos"] == undefined) return;
        count = content["videos"].length;
        for (i = 0; i < count; ++i) {
            elements.appendElement(sidebarVideosElement,
                elements.makeElement('a', NO_CSS,
                    {
                        href: '#'
                    },
                    {
                        onclick: function() {
                            let video = this.innerHTML;
                            webpage.updatePageContent(webpage.selectedItemId, video);
                        }
                    },
                        elements.makeText(content["videos"][i])
                ),
            );
            elements.appendElement(sidebarVideosElement,
                elements.makeElement('br', NO_CSS, NO_ATTRIBUTES, NO_EVENTS)
            );
        }
    }
};

/* AJAX events run out of object scope so keep them out of the webpage variable */
/*function gotHeading(status, htmldata) {
    webpage.updatePageHeader(htmldata);
}
function errorAjax(status, htmldata) {
    alert('Error ' + status + ' received');
}*/
function gotVideos(status, videoText) {
    let videos = JSON.parse(videoText);
    let oldVideos = webpage.contents.home.videos;
    webpage.contents.home.videos = videos;
    webpage.updatePageContent("home", "");
    oldVideos = undefined;
}
function error(status, errorData) {
    alert("error retrieving video collection");
}
/* End of AJAX events */