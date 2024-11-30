import {
    getInputValues,
    addItem,
    toggleSection,
    renderItemsList,
    convertSecondstoTime,
    converTimeIntoSeconds
} from "./dom_util.js"



const clipsButton = document.getElementById('addClipsButton');
const musicButton = document.getElementById('showMusicClipsButton');
const editButton = document.getElementById('editClipsButton')
const submitbutton = document.getElementById('submitButton');
const findButton = document.getElementById('findButton');
const inputFind = document.getElementById("findinput");
const cancelButton = document.getElementById("cancelButton");
const titleButton = document.getElementById("sortByTitleButton");
const bandButton = document.getElementById("sortByBandButton");
const lengthButton = document.getElementById("sortByLengthButton");
const viewsButton = document.getElementById("sortByViewsButton");
const minutesButton = document.getElementById("countMinutesButton");
const lengthLabel = document.getElementById("lengthlabel");
const countViewsButton = document.getElementById("countViewsButton");
const viewsLabel = document.getElementById("viewslabel");




let clips = [{
        id: 1,
        title: "3S'",
        band: "Mindless Self Indulgence",
        length: "02:30",
        views: "6007191"
    },
    {
        id: 2,
        title: "If You Seek Amy",
        band: "Britney Spears",
        length: "03:45",
        views: "141588400"
    },
    {
        id: 3,
        title: "Mutt",
        band: "Blink-182",
        length: "03:23",
        views: "8020126"
    }
];

let value = null;

clipsButton.addEventListener('click', (event) => {
    event.preventDefault();
    toggleSection('AddClip', 'MusicClips', 'EditClip');
});

musicButton.addEventListener('click', (event) => {
    event.preventDefault();
    toggleSection('MusicClips', 'AddClip', 'EditClip');
});

editButton.addEventListener('click', (event) => {
    event.preventDefault();
    toggleSection('EditClip', 'MusicClips', 'AddClip');
});

submitbutton.addEventListener('click', (e) => {
    e.preventDefault();
    value = getInputValues();
    if (value != -1) {
        console.log(value);
        clips.push(value);
        addItem(value);
        console.log(clips);
    }
});

findButton.addEventListener('click', () => {
    const foundClips = clips.filter(clip => clip.title.search(inputFind.value) !== -1);

    renderItemsList(foundClips);
});

cancelButton.addEventListener('click', () => {
    renderItemsList(clips);

    inputFind.value = "";
});

titleButton.addEventListener('click', () => {
    let sortedclips = clips.sort((a, b) => {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();

        if (titleA > titleB) return -1;
        if (titleA < titleB) return 1;
        return 0;
    });
    renderItemsList(sortedclips);
});

bandButton.addEventListener('click', () => {
    let sortedclips = clips.sort((a, b) => {
        const bandA = a.band.toLowerCase();
        const bandB = b.band.toLowerCase();

        if (bandA > bandB) return -1;
        if (bandA < bandB) return 1;
        return 0;
    });
    renderItemsList(sortedclips);
});

lengthButton.addEventListener('click', () => {
    let sortedclips = clips.sort((a, b) => {
        const lenA = converTimeIntoSeconds(a.length);
        const lenB = converTimeIntoSeconds(b.length);

        return lenA - lenB;
    });
    renderItemsList(sortedclips);
});

viewsButton.addEventListener('click', () => {
    let sortedclips = clips.sort((a, b) => a.views - b.views);
    renderItemsList(sortedclips);
});

minutesButton.addEventListener('click', () => {
    const totalseconds = clips.reduce((acc, clip) => acc + converTimeIntoSeconds(clip.length), 0);

    lengthLabel.textContent = convertSecondstoTime(totalseconds);
});

countViewsButton.addEventListener('click', () => {
    const totalviews = clips.reduce((acc, clip) => acc + parseInt(clip.views, 10), 0);

    viewsLabel.textContent = totalviews + " views";
});

renderItemsList(clips);
let secs = 800;
console.log(convertSecondstoTime(secs));
console.log(secs);
let mins = "03:12"
console.log(converTimeIntoSeconds(mins));


document.getElementById('addClipForm').addEventListener('submit', function(event) {
    if (!this.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
    }
    this.classList.add('was-validated');
});