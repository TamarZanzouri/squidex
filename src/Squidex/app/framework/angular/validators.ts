/*
 * Squidex Headless CMS
 * 
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved
 */

import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';

export class ValidatorsEx {
    public static pattern(pattern: string | RegExp, message: string | undefined = undefined): ValidatorFn {
        if (!pattern) {
            return Validators.nullValidator;
        }

        let regex: RegExp;
        let regexStr: string;

        if (typeof pattern === 'string') {
            regexStr = `^${pattern}$`;
            regex = new RegExp(regexStr);
        } else {
            regexStr = pattern.toString();
            regex = pattern;
        }

        return (control: AbstractControl): { [key: string]: any } => {
            const n: string = control.value;

            if (n == null || n.length === 0) {
                return null;
            }

            if (!regex.test(n)) {
                if (message) {
                    return { patternMessage: { requiredPattern: regexStr, actualValue: n, message } };
                } else {
                    return { pattern: { requiredPattern: regexStr, actualValue: n } };
                }
            }

            return null;
        };
    }

    public static between(minValue: number | undefined, maxValue: number | undefined) {
        return (control: AbstractControl): { [key: string]: any } => {
            const n: number = control.value;

            if (typeof n !== 'number') {
                return { validNumber: false };
            } else if (minValue && n < minValue) {
                return { minValue: { minValue, actualValue: n } };
            } else if (maxValue && n > maxValue) {
                return { maxValue: { maxValue, actualValue: n } };
            }

            return {};
        };
    }

    public static validValues<T>(values: T[]) {
        return (control: AbstractControl): { [key: string]: any } => {
            const n: T = control.value;

            if (values.indexOf(n) < 0) {
                return { validValues: false };
            }

            return {};
        };
    }
}