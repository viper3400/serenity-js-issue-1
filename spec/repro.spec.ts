import { equals } from '@serenity-js/assertions';
import { actorCalled, Duration, Log, Wait } from '@serenity-js/core';
import { By, Click, Navigate, PageElement, PageElements, Text } from '@serenity-js/web';

describe('click & scroll behavior', () => {

    it('using native click event', () =>
        actorCalled('testuser').attemptsTo(
            Navigate.to(grid.Url()),
            Wait.for(Duration.ofSeconds(2)),

            Log.the(Text.ofAll(grid.ContentEntries())),

            grid.NodeOne().click(),
            Wait.for(Duration.ofSeconds(2)),
            grid.NodeTwo().click(),
            Wait.for(Duration.ofSeconds(2)),
            grid.NodeOne().click(),

        ));

    it('using S/JS Click.on', () =>
        actorCalled('testuser').attemptsTo(
            Navigate.to(grid.Url()),
            Wait.for(Duration.ofSeconds(2)),

            Log.the(Text.ofAll(grid.ContentEntries())),

            Click.on(grid.NodeOne()),
            Wait.for(Duration.ofSeconds(2)),
            Click.on(grid.NodeTwo()),
            Wait.for(Duration.ofSeconds(2)),
            Click.on(grid.NodeOne()),
            Wait.for(Duration.ofSeconds(2))
        ));
});

class Grid {
    Url = () => 'https://www.ag-grid.com/example/'

    ContentContainer = () => PageElement.located(By.css('.ag-center-cols-container')).describedAs('content container');

    ContentEntries = () =>

        PageElements.located(By.css('.ag-cell-value')).describedAs('all list entries').of(this.ContentContainer());

    ContentNode = (nodeTitle: string) =>
        this.ContentEntries().where(Text, equals(nodeTitle)).first().describedAs(`the node with title ${nodeTitle}`);

    NodeOne = () => this.ContentNode('Andrew Connell');
    NodeTwo = () => this.ContentNode('Gil Lopes');
}

const grid = new Grid();