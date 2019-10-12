import { KeyWordModel } from '../../models/keyword';

const keywordModel = new KeyWordModel();

Component({
  properties: {

  },
  data: {

  },
  methods: {
    onCancel(){
      this.triggerEvent('cancelSearch',{},{})
    },
    onConfirm(e) {
      // console.log(e.detail.value);
      const word = e.detail.value;
      keywordModel.addToHistory(word);
    }
  }
})
