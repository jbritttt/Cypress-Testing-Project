/// <reference types="cypress"/>

describe("Our first test suite", () => {
  it("first test", () => {
    cy.visit("/");

    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();
    // by tag name
    cy.get("input");

    // by id name
    cy.get("#inputEmail1");

    // by class name
    cy.get(".input-full-width");

    // by attr name
    cy.get("[placeholder]");

    // by attr name and value
    cy.get('[placeholder="Email"]');

    // by class value
    cy.get('[class="input-full-width size-medium shape-rectangle"]');

    // by tag name and attr with value
    cy.get('input[placeholder="Email"]');

    // by two different attr
    cy.get('[placeholder="Email"][type="Email"]');

    //by tag name, attr with value. ID and Class name
    cy.get('input[placeholder="Email"]#inputEmail1.input-full-width');

    // the most recommended way in cypress
    cy.get('[data-cy="imputEmail1"]');
  });

  it("Second test", () => {
    cy.visit("/");

    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    cy.get('[data-cy="signInButton"]');
    cy.contains("Sign in");
    cy.contains('[status="warning"]', "Sign in");

    cy.get("#inputEmail3")
      .parents("form")
      .find("button")
      .should("contain", "Sign in")
      .parents("form")
      .find("nb-checkbox")
      .click();

    cy.contains("nb-card", "Horizontal form").find('[type="email"]');
  });

  it("then and wrap methods", () => {
    cy.visit("/");

    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();
    //cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain','Email')
    //cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain','Password')

    // saving results in a variable jquery way

    cy.contains("nb-card", "Using the Grid").then((firstForm) => {
      const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text();
      const passwordLabelFirst = firstForm
        .find('[for="inputPassword2"]')
        .text();
      expect(emailLabelFirst).to.equal("Email");
      expect(passwordLabelFirst).to.equal("Password");

      cy.contains("nb-card", "Basic form").then((secondForm) => {
        const passwordSecondText = secondForm
          .find('[for="exampleInputPassword1"]')
          .text();
        expect(passwordLabelFirst).to.equal(passwordSecondText);

        //convert back to the cypress way
        cy.wrap(secondForm)
          .find('[for="exampleInputPassword1"]')
          .should("contain", "Password");
      });
    });
  });

  // invoke command

  it("invoke command", () => {
    cy.visit("/");

    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    //1
    cy.get('[for="exampleInputEmail1"]').should("contain", "Email address");

    //2
    cy.get('[for="exampleInputEmail1"]').then((label) => {
      expect(label.text()).to.equal("Email address");

      //3  invoke command
      cy.get('[for="exampleInputEmail1"]')
        .invoke("text")
        .then((text) => {
          expect(text).to.equal("Email address");
        });

      cy.contains("nb-card", "Basic form")
        .find("nb-checkbox")
        .click()
        .find(".custom-checkbox")
        .invoke("attr", "class")
        .should("contain", "checked");
    });
  });




  it("assert property", () => {
    function selectDayFromCurrent(day) {
      let date = new Date();
      date.setDate(date.getDate() + day);
      let futureDay = date.getDate();
      let futureMonth = date.toLocaleString("default", { month: "short" });
      let dateAssert =
        futureMonth + " " + futureDay + ", " + date.getFullYear();

      cy.get("nb-calendar-navigation")
        .invoke("attr", "ng-reflect-date")
        .then((dateAttribute) => {
          if (!dateAttribute.includes(futureMonth)) {
            cy.get('[data-name="chevron-right"]').click();
            selectDayFromCurrent(day);
          } else {
            cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]')
              .contains(futureDay)
              .click();
          }
        });
      return dateAssert;
    }

    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Datepicker").click();

    cy.contains("nb-card", "Common Datepicker")
      .find("input")
      .then((input) => {
        cy.wrap(input).click();
        let dateAssert = selectDayFromCurrent(1);

        cy.wrap(input).invoke("prop", "value").should("contain", dateAssert);
        cy.wrap(input).should('have.value', dateAssert)
      });
  });




  it("radio button", () => {
    cy.visit("/");

    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    cy.contains("nb-card", "Using the Grid")
      .find('[type="radio"]')
      .then((radioButtons) => {
        cy.wrap(radioButtons)
          .first()
          .check({ force: true })
          .should("be.checked");

        cy.wrap(radioButtons).eq(1).check({ force: true }).should("be.checked");

        cy.wrap(radioButtons).first(1).should("not.be.checked");

        cy.wrap(radioButtons).eq(2).should("be.disabled");
      });
  });

  it("check boxes", () => {
    cy.visit("/");

    cy.contains("Modal & Overlays").click();
    cy.contains("Toastr").click();

    cy.get('[type="checkbox"]').check({ force: true });
    cy.get('[type="checkbox"]')
      .eq(0)
      .click({ force: true })
      .should("not.be.checked");
  });

  it("lists and dropdowns", () => {
    cy.visit("/");

    // cy.get('nav nb-select').click()
    //cy.get('.options-list').contains('Dark').click()
    //cy.get('nav nb-select').should('contain', 'Dark')
    //cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(34, 43, 69)')

    cy.get("nav nb-select").then((dropdown) => {
      cy.wrap(dropdown).click();
      cy.get(".options-list nb-option").each((listItem, index) => {
        const itemText = listItem.text().trim();

        const colors = {
          Light: "rgb(255, 255, 255)",
          Dark: "rgb(34, 43, 69)",
          Cosmic: "rgb(50, 50, 89)",
          Corporate: "rgb(255, 255, 255)",
        };

        cy.wrap(listItem).click();
        cy.wrap(dropdown).should("contain", itemText);
        cy.get("nb-layout-header nav").should(
          "have.css",
          "background-color",
          colors[itemText]
        );
        if (index < 3) {
          cy.wrap(dropdown).click();
        }
      });
    });
  });

  it("assert property", () => {
    cy.visit("/");

    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();

     //1
    cy.get("tbody")
      .contains("tr", "Larry")
      .then((tableRow) => {
       
        cy.wrap(tableRow).find(".nb-edit").click();
        cy.wrap(tableRow).find('[placeholder="Age"]').clear().type("25");
        cy.wrap(tableRow).find(".nb-checkmark").click();
        cy.wrap(tableRow).find("td").eq(6).should("contain", "25");
      });

    //2
    cy.get("thead").find(".nb-plus").click();
    cy.get("thead")
      .find("tr")
      .eq(2)
      .then((tableRow) => {
        cy.wrap(tableRow).find('[placeholder="First Name"]').type("Artem");
        cy.wrap(tableRow).find('[placeholder="Last Name"]').type("Bonder");
        cy.wrap(tableRow).find(".nb-checkmark").click();
      });

    cy.get("tbody")
      .first()
      .find("td")
      .then((tableColumn) => {
        cy.wrap(tableColumn).eq(2).should("contain", "Artem");
        cy.wrap(tableColumn).eq(3).should("contain", "Bonder");
      });

    //3
    const age = [20, 20, 40];
    cy.wrap(age).each((age) => {
      cy.get('thead [placeholder="Age"]').clear().type(age);
      cy.wait(500);
      cy.get("tbody tr").each((tableRow) => {
        if (age == 200) {
          cy.wrap(tableRow).should("contain", "No data found");
        } else {
          cy.wrap(tableRow).find("td").eq(6).should("contain", age);
        }
      });
    });
  });


  it("tool tip", () => {
    cy.visit("/");

    cy.contains("Modal & Overlays").click();
    cy.contains("Tooltip").click();

    cy.contains('nb-card', 'Colored Tooltips').contains('Default').click()
    cy.get('nb-tooltip').should('contain', 'This is a tooltip')


  })


  // dialog box that runs in the browser
  it("dialog box", () => {
    cy.visit("/");

    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();

//1   this is not the recomended way to assert text in a dialog box
    cy.get('tbody tr').first().find('.nb-trash').click()
    cy.on('window:confirm', (confirm) =>{

        expect(confirm).to.equal('Are you sure you want to delete?')
    })

    //2 with this method if the window did not show up then the stub will be empty which is exactly what is needed.
    const stub = cy.stub()
    cy.on('window:confirm', stub)
    cy.get('tbody tr').first().find('.nb-trash').click().then(() =>{

        expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
    })


     //3
     cy.get('tbody tr').first().find('.nb-trash').click()
    cy.on('window:confirm', () => false)

});
});

