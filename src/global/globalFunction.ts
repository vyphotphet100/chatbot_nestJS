import {snakeCase, camelCase} from 'lodash';
  
export function camelCaseToSnakeCase(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
  
    if (obj.length == null) {
        const result = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const snakeCaseKey = snakeCase(key);
                result[snakeCaseKey] = camelCaseToSnakeCase(obj[key]);
            }
        }

        return result;
    } else {
        const result = [];
        for (let i=0; i<obj.length; i++) {
            result.push(camelCaseToSnakeCase(obj[i]))
        }

        return result;
    }    
}

export function snakeCaseToCamelCase(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
  
    if (obj.length == null) {
        const result = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const snakeCaseKey = camelCase(key);
                result[snakeCaseKey] = snakeCaseToCamelCase(obj[key]);
            }
        }

        return result;
    } else {
        const result = [];
        for (let i=0; i<obj.length; i++) {
            result.push(snakeCaseToCamelCase(obj[i]))
        }

        return result;
    }    
}