import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ConfigService } from '../../config.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-input-traduction',
  templateUrl: './input-traduction.component.html',
  styleUrls: ['./input-traduction.component.scss']
})
export class InputTraductionComponent implements OnInit {
  @Input() group: FormGroup;
  @Input() controlName: string;
  @Input() groupName: string;
  @Input() readOnly = false;
  @Input() language: boolean;
  modalRef: BsModalRef;
  constructor(
    private translate: TranslateService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private config: ConfigService
  ) { }

  ngOnInit() {
    const translationGroup = this.fb.group({});
    const translationGroup1 = this.fb.group({});
    this.config.languages.forEach((x, i) => {
      translationGroup.setControl(x.key, new FormControl());
    });
    translationGroup1.setControl('translations', translationGroup);
    this.group.setControl(this.groupName, translationGroup1);
  }


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  onChange(value) {
    const lang = this.config.languages[0].key;
    const patchObject = {};
    const groupTranslate = this.group.controls[this.groupName];
    patchObject[lang] = value;
    groupTranslate['controls'].translations.patchValue(patchObject);
  }
  validate() {
    this.modalRef.hide();
  }
  annulate() {
    this.config.languages.forEach((x, i) => {
      if (i !== 0) {
        const lang = this.config.languages[i].key;
        const patchObject = {};
        patchObject[lang] = '';
        const groupTranslate = this.group.controls[this.groupName];
        groupTranslate['controls'].translations.patchValue(patchObject);
      }
    });
    this.modalRef.hide();
  }
}
