import React from 'react'
import { injectIntl, intlShape, defineMessages } from 'react-intl'
import MobilePage, {
    Title,
    Button,
    Divider,
    mixins,
} from 'components/MobilePage'

const messages = defineMessages({
    title: {
        id: 'pages.JoinPage.title',
        defaultMessage: 'AppTitle',
    },
})

const styles = {
    wrapper: {
        ...mixins.flexCenteredTop,
        flex: 1,
        flexDirection: 'column',
    },
    inner: {
        ...mixins.flexCentered,
        flexDirection: 'column',
        width: '70%',
        maxWidth: 350,
        marginTop: '20vh',
    },
}

const JoinPage = ({ intl }) => (
    <MobilePage>
        <MobilePage.Body noScroll withPadding flex>
            <div style={styles.wrapper}>
                <div style={styles.inner}>
                    <Title>
                        {intl.formatMessage(messages.title)}
                    </Title>
                    <Divider />
                    <Button
                        block
                    >enter the game</Button>
                </div>
            </div>
        </MobilePage.Body>
    </MobilePage>
)

JoinPage.propTypes = {
    intl: intlShape.isRequired,
}

export default injectIntl(JoinPage)
