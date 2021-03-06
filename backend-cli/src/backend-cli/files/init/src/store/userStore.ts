import { observable, action, computed } from "mobx";
import request from "@/utils/request";

// API
const api = {
  fetchAll: ({ page = 1, limit = 10, search = null }) =>
    request({
      url: "/url",
      params: { page, limit, search }
    })
  // API METHOD
};

class store {
  // OBSERVABLE
  @observable private _list: any[] = [];
  @observable private _total = 0;
  @observable private _queryParams = {
    page: 1,
    limit: 10,
    search: null
  };

  // COMPUTED
  @computed get list() {
    return this._list.slice();
  }

  // ACTION
  @action
  async fetchAll() {
    const res = await api.fetchAll({
      page: this._queryParams.page,
      limit: this._queryParams.limit,
      search: this._queryParams.search
    });
    this._list = [...this._list, ...res.data.data];
    this._total = res.data.total;
  }

  @action
  resetQueryParams() {
    this._queryParams = {
      ...this._queryParams,
      page: 1,
      limit: 10
    };
  }

  @action
  async loadMore() {
    if (this._queryParams.limit * this._queryParams.page >= this._total) return;
    this._queryParams.page++;
    await this.fetchAll();
  }
}

export default new store();
