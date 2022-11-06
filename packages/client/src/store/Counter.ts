import { computed, makeAutoObservable, observable } from 'mobx'

class Counter {
  @observable
  count = 0

  @observable
  timer= 60

  constructor() {
    makeAutoObservable(this)
  }

  increment() {
    this.count = this.count + 1
    console.log('increment')
  }

  decrement() {
    this.count = this.count - 1
    console.log('decrement')
  }

  @computed
  get total(){
    return `Count + timer = ` + this.timer + this.count
  }

}

export default new Counter()
