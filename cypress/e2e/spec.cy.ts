import '@testing-library/cypress/add-commands';

describe('HomeScreen', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/').wait(1000);
  });

  it('has title', () => {
    cy.title().should('match', /React Query/);
  });

  it('Add todo', () => {
    cy.get('[placeholder="your new todo"]').click().type('New todo');
    cy.contains('button', 'Add new todo').click();

    cy.get('[data-e2e="todo-length"]').then(($length) => {
      const todoLength = parseInt($length.text(), 10);
      expect(todoLength).to.equal(1);
    });

    cy.get('[data-e2e="nested-todo-length"]').then(($length) => {
      const nestedTodoLength = parseInt($length.text(), 10);
      expect(nestedTodoLength).to.be.greaterThan(0);
    });
  });

  it('Remove todos', () => {
    cy.get('[placeholder="your new todo"]').click().type('New todo');
    cy.contains('button', 'Add new todo').click();

    cy.get('[placeholder="your new todo"]').click().clear();

    cy.contains('New todo').click();

    cy.get('[data-e2e="todo-length"]').then(($length) => {
      const todoLength = parseInt($length.text(), 10);
      expect(todoLength).to.equal(1);
    });

    cy.contains('button', 'Remove todos').click();

    cy.get('[data-e2e="todo-length"]').then(($length) => {
      const todoLength = parseInt($length.text(), 10);
      expect(todoLength).to.equal(0);
    });
  });
});
