export const colors = {
    accent: "#F3534A",
    primary: "#0AC4BA",
    secondary: "#2BDA8E",
    tertiary: "#FFE358",
    black: "#323643",
    white: "#FFFFFF",
    gray: "#9DA3B4",
    gray2: "#C5CCD6",
};

export const sizes = {
    // global sizes
    base: 16,
    font: 14,
    radius: 6,
    padding: 25,

    // font sizes
    h1: 26,
    h2: 20,
    h3: 18,
    title: 18,
    header: 16,
    body: 14,
    caption: 12,
};

export const fonts = {
    h1: {
        fontSize: sizes.h1
    },
    h2: {
        fontSize: sizes.h2
    },
    h3: {
        fontSize: sizes.h3
    },
    header: {
        fontSize: sizes.header
    },
    title: {
        fontSize: sizes.title
    },
    body: {
        fontSize: sizes.body
    },
    caption: {
        fontSize: sizes.caption
    },

};

export const boxShadow = {
    default: {
        shadowColor: "#0000001F",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 2
    }
}

export const appStyle = {
    image: {
        width: "100%",
        height: "100%"
    },
    divider: {
        height: 1,
        backgroundColor: "#C6C6C6",
        alignSelf: "center"
    },
    button: {
        borderRadius: 8,
        backgroundColor: colors.primary
    },
    borderBottom: {
        borderBottomWidth: 1,
        borderBottomColor: "#D9D9D9"
    }
};
