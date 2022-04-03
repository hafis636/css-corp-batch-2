import Input from '@components/Input';
import Select from '@components/Select';
import { GenderEnum } from 'types/commonTypes';
import { FieldsProps } from 'types/customTypes';

export type LoginInitValuesType = {
  email: string;
  password: string;
  remember_me: boolean;
  serverError?: string;
};
export type AddressInitValuesType = {
  fullname: string;
  address1: string;
  address2: string;
  zipcode: string;
  phone: string;
};

export const LoginInitValues: LoginInitValuesType = {
  email: '',
  password: '',
  remember_me: false,
};

export const LoginFields = [
  {
    name: 'email',
    component: Input,
    type: 'email',
    autoComplete: 'email',
    placeholder: 'Email address',
    validate: (value: string) => {
      if (!value) {
        return 'required...';
      }
    },
    isFirst: true,
  },
  {
    name: 'password',
    component: Input,
    type: 'password',
    autoComplete: 'current-password',
    placeholder: 'Password',
    validate: (value: string) => {
      if (!value) {
        return 'required...';
      }
    },
    isLast: true,
  },
];

export const AddressInitValues: AddressInitValuesType = {
  fullname: '',
  address1: '',
  address2: '',
  zipcode: '',
  phone: '',
};

export const AddressFields = [
  {
    name: 'fullname',
    component: Input as React.ComponentType,
    placeholder: 'Name',
    validate: (value: string) => {
      if (!value) {
        return 'required...';
      }
    },
  },
  {
    name: 'address1',
    component: Input as React.ComponentType,
    placeholder: 'Address 1',
    validate: (value: string) => {
      if (!value) {
        return 'required...';
      }
    },
  },
  {
    name: 'address2',
    component: Input as React.ComponentType,
    placeholder: 'Address 2',
    validate: (value: string) => {
      if (!value) {
        return 'required...';
      }
    },
  },
  {
    name: 'zipcode',
    component: Input as React.ComponentType,
    placeholder: 'Zip code',
    validate: (value: string) => {
      if (!value) {
        return 'required...';
      }
    },
  }, ,
  {
    name: 'phone',
    component: Input as React.ComponentType,
    placeholder: 'Phone',
    validate: (value: string) => {
      if (!value) {
        return 'required...';
      }
    },
  },
];


export type RegisterInitValuesType = {
  name: string;
  gender: GenderEnum | '';
  email: string;
  password: string;
  confirmPassword: string;
  serverError?: string;
};

export const RegisterInitValues: RegisterInitValuesType = {
  name: '',
  gender: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export const RegisterFields: FieldsProps<RegisterInitValuesType>[] = [
  {
    name: 'name',
    component: Input as React.ComponentType,
    placeholder: 'Name',
    validate: (value: string) => {
      if (!value) {
        return 'required...';
      }
    },
    isFirst: true,
  },
  {
    name: 'gender',
    component: Select as React.ComponentType,
    placeholder: 'Please Select Gender',
    options: [
      { value: GenderEnum.male, text: 'Male' },
      { value: GenderEnum.female, text: 'Female' },
      { value: GenderEnum.other, text: 'Other' },
    ],
    validate: (value: string) => {
      if (!value) {
        return 'required...';
      }
    },
  },
  {
    name: 'email',
    component: Input as React.ComponentType,
    type: 'email',
    autoComplete: 'email',
    placeholder: 'Email address',
    validate: (value: string) => {
      if (!value) {
        return 'required...';
      }
    },
  },
  {
    name: 'password',
    component: Input as React.ComponentType,
    type: 'password',
    autoComplete: 'new-password',
    placeholder: 'Password',
    validate: (value: string) => {
      if (!value) {
        return 'required...';
      }
    },
  },
  {
    name: 'confirmPassword',
    component: Input,
    type: 'password',
    autoComplete: 'new-password',
    placeholder: 'Confirm Password',
    validate: (value: string) => {
      if (!value) {
        return 'required...';
      }
    },
    isLast: true,
  },
];