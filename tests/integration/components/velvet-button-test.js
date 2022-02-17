import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

const SELECTOR = 'button[type="button"]';

module('Integration | Component | velvet-button', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders the correct base class', async function (assert) {
    await render(hbs`
      <VelvetButton />
    `);

    assert.dom(SELECTOR).exists();
  });

  test('it renders the yielded content', async function (assert) {
    await render(hbs`
      <VelvetButton />
    `);

    assert.dom(SELECTOR).hasNoText();

    await render(hbs`
      <VelvetButton>
        Text
      </VelvetButton>
    `);

    assert.dom(SELECTOR).hasText('Text');
  });

  test('it renders the correct color', async function (assert) {
    await render(hbs`
      <VelvetButton />
    `);

    assert.dom(SELECTOR).hasClass('velvet-button-primary');

    await render(hbs`
      <VelvetButton @color="red" />
    `);

    assert.dom(SELECTOR).hasClass('velvet-button-red');
  });

  test('it renders the correct size', async function (assert) {
    await render(hbs`
      <VelvetButton />
    `);

    assert.dom(SELECTOR).hasClass('velvet-button-md');

    await render(hbs`
      <VelvetButton @size="lg" />
    `);

    assert.dom(SELECTOR).hasClass('velvet-button-lg');
  });

  test('it renders the correct variant', async function (assert) {
    await render(hbs`
      <VelvetButton />
    `);

    assert.dom(SELECTOR).hasClass('velvet-button-solid');

    await render(hbs`
      <VelvetButton @variant="outline" />
    `);

    assert.dom(SELECTOR).hasClass('velvet-button-outline');
  });

  test('it renders a disabled button', async function (assert) {
    await render(hbs`
      <VelvetButton />
    `);

    assert.dom(SELECTOR).doesNotHaveAttribute('disabled');

    await render(hbs`
      <VelvetButton @isDisabled={{true}} />
    `);

    assert.dom(SELECTOR).hasAttribute('disabled');
  });

  test('it renders a loading state', async function (assert) {
    await render(hbs`
      <VelvetButton />
    `);

    assert.dom('.velvet-spinner').doesNotExist();

    await render(hbs`
      <VelvetButton @isLoading={{true}} />
    `);

    assert.dom('.velvet-spinner').exists();
  });

  test('it renders a rounded button', async function (assert) {
    await render(hbs`
      <VelvetButton />
    `);

    assert.dom(SELECTOR).doesNotHaveClass('velvet-button-rounded');

    await render(hbs`
      <VelvetButton @isRounded={{true}} />
    `);

    assert.dom(SELECTOR).hasClass('velvet-button-rounded');
  });

  test('it renders the correct type', async function (assert) {
    await render(hbs`
      <VelvetButton />
    `);

    assert.dom(SELECTOR).exists();

    await render(hbs`
      <VelvetButton @type="submit" />
    `);

    assert.dom('button[type="submit"]').exists();
  });

  test('it handles `click` events', async function (assert) {
    this.onClick = () => assert.step('clicked');

    await render(hbs`
      <VelvetButton @onClick={{this.onClick}} />
    `);

    await click(SELECTOR);

    assert.verifySteps(['clicked']);
  });

  test('renderless', async function (assert) {
    await render(hbs`
      <VelvetButton @isRenderless={{true}} as |button|>
        {{button.class}}
      </VelvetButton>
    `);

    assert.dom(SELECTOR).doesNotExist();

    assert
      .dom()
      .hasText(
        'velvet-button velvet-button-primary velvet-button-md velvet-button-solid'
      );
  });

  test('`...attributes` works', async function (assert) {
    await render(hbs`
      <VelvetButton class="mr-2" />
    `);

    assert.dom(SELECTOR).hasClass('mr-2');
  });
});
