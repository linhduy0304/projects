
export const dealSlotUnit = (hint_text) => {
    if (!hint_text) return '';
    if (hint_text.toLowerCase().indexOf('số') > -1) {
        return hint_text.toLowerCase().replace('số', '');
    }
    return hint_text.trim();
}