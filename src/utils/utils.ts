export const booleanToPortuguese = (bool: boolean): 'SIM' | 'NÃO' => {
    return bool ? 'SIM' : 'NÃO';
}

export const portugueseToBoolean = (bool: string): boolean => {
    return bool === 'Sim' ? true : false;
}