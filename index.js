const URL = "https://static.easysunday.com/covid-19/getTodayCases.json"

async function getCovidData() {
    // a function that get requests from Sunday Technologies

    const request = new Request(URL)
    return await request.loadJSON()
}

function parseDate(data) {
    // format date to system string
    
    return new Date(data.updated).toLocaleDateString()
}

function addDateText(stack, text) {
    // add date string to widget
    
    let dateText = stack.addText(text + "\n")
    dateText.centerAlignText()
    dateText.font = Font.semiboldSystemFont(13)
    dateText.textColor = new Color("#ffffff")
}

function addTodayCasesText(stack, text) {
    // add cases string to widget
    
    let casesText = stack.addText(text);
    casesText.centerAlignText()
    casesText.font = Font.boldSystemFont(30)
    casesText.textColor = new Color("#ffffff")
}

function addCreditText(stack) {
    // add credit string to widget

    let creditText = stack.addText("ข้อมูลจาก Sunday Technologies")
    creditText.centerAlignText()
    creditText.font = Font.semiboldSystemFont(6)
    creditText.textColor = new Color("#ffffff")
}

function displayData(stack, updatedDate, data) {
    // a function that display all data in widget

    addTodayCasesText(stack, data.todayCases.toLocaleString())
    addDateText(stack, updatedDate)
    addCreditText(stack)
}

async function createWidget() {
    // a function that create widget

    let listWidget = new ListWidget()

    listWidget.backgroundColor = new Color("#f95e5e")

    let heading = listWidget.addText("วันนี้ติดกันกี่คน ?")
    heading.centerAlignText()
    heading.font = Font.regularSystemFont(14)
    heading.textColor = new Color("#ffffff")

    listWidget.addSpacer(5)

    let data = await getCovidData()
    let updatedDate = parseDate(data)

    displayData(listWidget, updatedDate, data)

    return listWidget
}

let widget = await createWidget()

if (config.runsInWidget) {
    Script.setWidget(widget)
} else {
    widget.presentSmall()
}

Script.complete()