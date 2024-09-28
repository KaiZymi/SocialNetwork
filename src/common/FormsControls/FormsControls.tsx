// import React, {FC} from "react";
// import styles from "./FormsControls.module.css"
// import {WrappedFieldMetaProps, WrappedFieldProps} from "redux-form/lib/Field";
//
// import {FieldValidatorType} from "../../utils/validators/validations";
//
// type FormControlPropsType = {
//     meta: WrappedFieldMetaProps
//     children: React.ReactNode
// }
//
//
// const FormControl: FC<FormControlPropsType> = ({meta: {touched, error}, children}) => {
//     const hasError = touched && error
//
//     return (
//         <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
//             <div>
//                 {children}
//             </div>
//             {hasError && <span>{error}</span>}
//         </div>
//     )
//
// }
//
// export const Textarea: FC<WrappedFieldProps> = (props) => {
//     const {input, meta, ...restProps} = props
//     return <FormControl {...props}> <textarea {...input} {...restProps} /> </FormControl>
// }
//
// export const Input: FC<WrappedFieldProps> = (props) => {
//     const {input, meta, ...restProps} = props
//     return <FormControl {...props}> <input {...input} {...restProps} /> </FormControl>
//
// }
//
// export function createField<FormKeysType extends string>(placeholder: string | undefined,
//                                                          name: FormKeysType,
//                                                          validators: Array<FieldValidatorType>,
//                                                          component: React.FC<WrappedFieldProps>,
//                                                          props = {}, text = "") {
//     return <div>
//         <Field placeholder={placeholder} name={name}
//                validate={validators}
//                component={component}
//                {...props}
//         /> {text}
//     </div>
// }
//
// export type GetStringKeys<T> = Extract<keyof T, string>
//
