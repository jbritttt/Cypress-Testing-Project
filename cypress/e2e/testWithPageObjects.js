import { onDatepickerPage } from "../support/page_objects/datepickerPage"
import { onFormLayoutsPage } from "../support/page_objects/formLayoutsPage"
import { onSmartTablePage } from "../support/page_objects/smartTablePage"
import { navigateTo } from "../support/page_objects/navigationPage"

describe('Test with Page Objects', ()=>{

beforeEach('open application', () =>{

cy.openHomePage()

})

it('verify navigation across the pages',() =>{

navigateTo.formLayoutsPage()
navigateTo.datePickerPage()
navigateTo.smartTablePage()
navigateTo.tooltipPage()
navigateTo.toasterPage()

} )

    it.only('should submit inline and Basic form and select tomorrow date in the calender', () =>{


        navigateTo.formLayoutsPage()
        onFormLayoutsPage.submitInlineFormWithNameAndEmail('Artem', 'test@test.com')
        onFormLayoutsPage.submitBasicFormWithEmailAndPassword('test@test.com', 'password')
        navigateTo.datePickerPage()
        onDatepickerPage.selectCommonDatepickerDateFromToday(1)
        onDatepickerPage.selectDatepickerWithRangeFromToday(7, 14)
        navigateTo.smartTablePage()
        onSmartTablePage.addNewRecordWithFirstAndLastName('Artem', 'Bondar')
        onSmartTablePage.updateAgeByFirstName('Artem', '35')
        onSmartTablePage.deleteRowByIndex(1)
    })
})
