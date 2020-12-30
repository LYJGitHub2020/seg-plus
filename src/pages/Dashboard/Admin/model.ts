import { Effect, Reducer, Subscription } from 'umi';
import { getRegistered, getPayment, getClassify } from './service';

export interface AdminModelState {
  Registereddata: [];
  Paymentdata: [];
  Classifydata: [];
  meta: {
    total: number;
    pageNum: number;
    pageSize: number;
  };
}

export interface UserModelType {
  namespace: 'admins';
  state: AdminModelState;
  effects: {
    Registered: Effect;
    Payment: Effect;
    Classify: Effect;
  };
  reducers: {
    save: Reducer<AdminModelState>;
  };
  subscriptions: { setup: Subscription };
}

const UserModel: UserModelType = {
  namespace: 'admins',
  state: {
    Registereddata: [],
    Paymentdata: [],
    Classifydata: [],
    meta: {
      total: 0,
      pageNum: 1,
      pageSize: 100,
    },
  },

  effects: {
    *Registered({ payload }, { call, put }) {
      const admins = yield call(getRegistered, payload);
      yield put({
        type: 'save',
        payload: {
          Registereddata: admins.data.records.map(
            (
              item: { recordId: any; fields: { Classify: any; Number: any; Category: any } },
              index: number,
            ) => {
              return {
                id: index + 1,
                recordId: item.recordId,
                Classify: item.fields.Classify,
                Number: item.fields.Number,
                Category: item.fields.Category,
              };
            },
          ),
        },
      });
    },

    *Payment({ payload }, { call, put }) {
      const admins = yield call(getPayment, payload);
      yield put({
        type: 'save',
        payload: {
          Paymentdata: admins.data.records.map(
            (
              item: { recordId: any; fields: { Classify: any; Number: any; Category: any } },
              index: number,
            ) => {
              return {
                id: index + 1,
                recordId: item.recordId,
                Classify: item.fields.Classify,
                Number: item.fields.Number,
                Category: item.fields.Category,
              };
            },
          ),
        },
      });
    },

    *Classify({ payload }, { call, put }) {
      const admins = yield call(getClassify, payload);
      yield put({
        type: 'save',
        payload: {
          Classifydata: admins.data.records.map(
            (item: { recordId: any; fields: { Classify: any; Number: any } }, index: number) => {
              return {
                id: index + 1,
                recordId: item.recordId,
                Classify: item.fields.Classify,
                Number: item.fields.Number,
              };
            },
          ),
        },
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/dashboard/admin/admin') {
          dispatch({
            type: 'Registered',
          });
          dispatch({
            type: 'Payment',
          });
          dispatch({
            type: 'Classify',
          });
        }
      });
    },
  },
};

export default UserModel;
