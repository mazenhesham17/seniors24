import html2canvas from 'html2canvas';

export async function downloadMemory(elementId: number): Promise<void> {
    const element = document.getElementById(`card-${elementId}`);
    if (!element)
        return

    const clone = element.cloneNode(true) as HTMLElement;

    const scrollableElement = clone.querySelector(`#scroll-element-${elementId}`) as HTMLElement;

    if (!scrollableElement)
        return


    const hideElement = clone.querySelector(`#hide-element-${elementId}`) as HTMLElement;

    if (hideElement)
        hideElement.style.display = 'none';

    scrollableElement.style.overflowY = 'visible';
    scrollableElement.style.maxHeight = 'none';

    const offScreenContainer = document.createElement('div');
    offScreenContainer.style.position = 'fixed';
    offScreenContainer.style.left = '-9999px';
    offScreenContainer.appendChild(clone);
    document.body.appendChild(offScreenContainer);

    const canvas = await html2canvas(clone, {
        scrollY: -window.scrollY,
        useCORS: true,
        backgroundColor: null,
        scale: 3,
    });

    const dataUrl = canvas.toDataURL('image/png');

    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `memory-${elementId}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up
    document.body.removeChild(offScreenContainer);
}
