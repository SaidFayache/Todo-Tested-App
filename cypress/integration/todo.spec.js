/// <reference types="Cypress" />

describe('TODO App > ', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Empty todos & dones', () => {
    cy.get('#todo-body').children().should('have.length', 0);
    cy.get('#done-body').children().should('have.length', 0);
  });

  it('Create todo', () => {
    cy.createTODO("My Todo 1");
    cy.get('#todo-body').children().should('have.length', 1);
    cy.get('#done-body').children().should('have.length', 0);
  });

  it('create a TODO & mark it done', () => {
    cy.createTODO("My Todo 1");
    cy.get('button[cy-data="todo-0"]').click();
    cy.get('#todo-body').children().should('have.length', 0);
    cy.get('#done-body').children().should('have.length', 1);
  });

  it('create 4 todos and mark 1 done', () => {
    cy.createTODO("My Todo 1");
    cy.createTODO("My Todo 2");
    cy.createTODO("My Todo 3");
    cy.createTODO("My Todo 4");
    cy.get('button[cy-data="todo-0"]').click().then(() => {
            cy.get('#done-body').children().should('have.length', 1);
            cy.get('#todo-body').children().should('have.length', 3);
        });
  });

    it('create empty title todo', () => {
        cy.createTODO("   "); // title is empty should not get added
        cy.get('#todo-body').children().should('have.length', 0); // the created todo must not get added => list must be of length 0
    });
});
