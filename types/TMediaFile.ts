export type TMediaFileSizeKey = 'thumbnail' | 'small' | 'large' | 'full';

export type TMediaFileSize = {
    filename: string;
    width: number;
    height: number;
    url: string;
};

export type TMediaFile = {
    id: number;
    filename: string;
    extension: string;
    mime_type: string;
    url: string;
    title: string;
    sizes: { [key in TMediaFileSizeKey]: TMediaFileSize } | null;

    preferedSize?: TMediaFileSize;
};