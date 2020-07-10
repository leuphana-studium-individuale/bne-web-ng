import {NgModule} from '@angular/core';
import {TagChipsComponent} from './tag-chips/tag-chips.component';
import {TagChipsImports} from './tag-chips.imports';
import {TagChipsDeclarations} from './tag-chips.declaration';
import {SelectableTagChipsComponent} from './selectable-tag-chips/selectable-tag-chips.component';

@NgModule({
  imports: [TagChipsImports],
  declarations: [TagChipsDeclarations],
  entryComponents: [
    TagChipsComponent
  ],
    exports: [
        TagChipsComponent,
        SelectableTagChipsComponent
    ],
})
export class TagChipsModule {
}
