import { Flex, Box, Heading } from "@chakra-ui/react"

export interface IHeaderProps {
    renderUserInfo: () => JSX.Element
    renderAuthButton: () => JSX.Element
}

export const Header = (props: IHeaderProps) => {

    return (
        <Flex mt={'1rem'} flexDir={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <Box>
                <Heading size={'lg'}>Expense Tracker</Heading>
                {props.renderUserInfo()}
            </Box>
            {props.renderAuthButton()}
        </Flex>
    )
}