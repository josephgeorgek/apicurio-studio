/**
 * @license
 * Copyright 2017 JBoss Inc
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {Component, Input, ViewEncapsulation} from "@angular/core";
import {OasDocument, OasLibraryUtils} from "oai-ts-core";
import {SourceFormComponent} from "./source-form.base";
import {SelectionService} from "../../_services/selection.service";
import {CommandService} from "../../_services/command.service";
import {DocumentService} from "../../_services/document.service";
import {createReplaceDocumentCommand, ICommand} from "oai-ts-commands";


@Component({
    moduleId: module.id,
    selector: "main-form",
    templateUrl: "main-form.component.html",
    encapsulation: ViewEncapsulation.None
})
export class MainFormComponent extends SourceFormComponent<OasDocument> {

    library: OasLibraryUtils = new OasLibraryUtils();

    _document: OasDocument;
    @Input()
    set document(doc: OasDocument) {
        this._document = doc;
        this.sourceNode = doc;
        this.revertSource();
    }
    get document(): OasDocument {
        return this._document;
    }

    /**
     * C'tor.
     * @param selectionService
     * @param commandService
     * @param documentService
     */
    public constructor(protected selectionService: SelectionService, protected commandService: CommandService,
                       protected documentService: DocumentService) {
        super(selectionService, commandService, documentService);
    }

    /**
     * Returns true if the form is for an OpenAPI 3.x document.
     */
    public is3xForm(): boolean {
        return this.document.is3xDocument();
    }

    protected createEmptyNodeForSource(): OasDocument {
        return this.library.createDocument(this.document.getSpecVersion());
    }

    protected createReplaceNodeCommand(node: OasDocument): ICommand {
        return createReplaceDocumentCommand(this.document, node);
    }

    public saveSource(): void {
        super.saveSource();
        this.sourceNode = this._document;
    }

}
