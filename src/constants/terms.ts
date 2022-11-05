const heading =  [
    {
        name: "Welcome to our website",
        text: "By using this website, you agree to comply with and be bound by the following terms and conditions of use (“Terms and Conditions”) which, together with our Privacy Policy, govern MerchFlow, Inc.’s relationship with you in relation to this website as well as to all transactions between you and MerchFlow, Inc. If you disagree with any part of these Terms and Conditions, please do not use our website or use MerchFlow Inc.’s services."
    },
    {
        name: "Definitions",
        text: "The term “MerchFlow”, or ‘us’ or ‘we’ refers to MerchFlow, Inc. who is the owner of this website and who is a Delaware-registered corporation (USA). The terms “you” and “your” refer to the user or viewer of our website. You are subject to the following terms of use:"
    }
]

const terms = [
    {
        name: "Disclaimer",
        text: "The content of the pages of this website is for your general information and use only. It is subject to change without notice."
    },
    {
        name: "Grant of License",
        text: "When you utilize MerchFlow’s services (the “Services”), MerchFlow grants you, and you accept, subject to these Terms and Conditions, a limited, non-exclusive, non-sublicensable, non-transferable license during your use of the Services (the “License”). You shall not have any rights in or to the Services except as expressly granted in these Terms and Conditions. MerchFlow reserves to itself all rights not expressly granted to others pursuant to these Terms and Conditions."
    },
    {
        name: "Copyright and Title",
        text: "The Services and all copyrights, trade secrets and other proprietary rights therein, including any derivative work, are and will remain the sole property of MerchFlow, regardless of the use thereof made by you; and are protected by certain state, United States and international intellectual property laws. The License confers no title of ownership in the Services and is not a sale of any rights in the Services. You shall treat the Services with at least the same standard of care as you treat any other material copyrighted and/or trademarked by a third party, in no case less than a reasonable standard of care. You agree not to challenge MerchFlow’s ownership in or enforceability of MerchFlow’s rights in and to the Services or any related intellectual property."
    },
    {
        name: "Use of Services",
        text: "Use of the Services is subject to the terms of use set forth in these Terms and Conditions. If there is unauthorized use by anyone who obtained access to the Services directly or indirectly through you, you shall take all steps reasonably necessary and cooperate and assist with any actions taken by MerchFlow to prevent or terminate such unauthorized use. You will indemnify, defend and hold MerchFlow harmless from any and all liability, loss, damage, expense or other costs resulting from such access."
    },
    {
        name: "Assignment",
        text: "You shall not assign or otherwise transfer the License granted hereby or the rights granted hereunder without the prior written consent of MerchFlow, in its absolute, complete and unqualified discretion. Any attempt to assign or otherwise transfer any of the rights, duties or obligations hereunder without compliance with this Section is and shall be void."
    },
    {
        name: "Trade Secrets",
        text: "The Services are the confidential information of MerchFlow and contain valuable proprietary products and trade secrets of MerchFlow, embodying substantial creative efforts and confidential information, ideas, and expressions. You shall take appropriate action to protect the confidentiality of the Services. You shall not modify, translate, disassemble, create derivative works based on, reverse-assemble, reverse-compile or otherwise reverse-engineer the Services in whole or in part, or otherwise use, copy, reproduce or distribute any Services except as expressly permitted hereunder."
    },
    {
        name: "Competitors",
        text: "You agree not to access the website and the Services if you are a competitor of MerchFlow. You agree not to provide access to the Services to any party who is a competitor of MerchFlow or to any party who is not authorized to use the Services. In addition, you may not access the Services for purposes of monitoring their availability, performance or functionality, or for any other benchmarking or competitive purposes."
    },
    {
        name: "Other Restrictions",
        options: ['rent, loan, license, market, or sell the Services to any party;', 'use the Services beyond the scope of the License;', 'use the Services in violation of any law, regulation, or rule'],
        otherOptions: ['to notify any of your agents and representatives who may have access to the Services of the restrictions in these Terms and Conditions', 'to ensure their compliance with such restrictions.']
    },
    {
        name: "Other Websites",
        text: "From time to time this website may also include links to other websites. These links are provided for your convenience to provide further information. They do not signify that we endorse the website(s). We have no responsibility or liability for the content of the linked website(s)."
    },
    {
        name: "Collection/Use of Information",
        text: "You acknowledge that MerchFlow may, directly or indirectly through the services of third parties, collect and store information regarding use of its Services. You agree that MerchFlow may use such information in accordance with its Privacy Policy located on this website and for any purpose related to any use of the Services by MerchFlow, including but not limited to, improving the performance of the Services or developing updates thereto and verifying your compliance with these Terms and Conditions and enforcing MerchFlow’s rights in and to the Services."
    },
    {
        name: "Compliance With Laws",
        text: "You will comply with all applicable laws and regulations and obtain at your expense all necessary licenses, permits and regulatory approvals required by any and all governmental authorities in your use of the Services."
    },
    {
        name: "DISCLAIMER OF WARRANTY",
        text: "Merchflow’s services are provided 'as is' without warranty of any kind, oral, written, statutory, express or implied, including, but not limited to, warranties of performance or merchantability or fitness for a particular purpose. You bear all risk relating to quality, performance and use of the services. Without limiting the foregoing, merchflow does not warrant that all errors can be corrected, or that operation of the services shall be error-free or uninterrupted. Because some states may not allow the exclusion of implied warranties, such limitation may not apply in its entirety to you. Any warranties made in these terms and conditions are for your benefit only.",
    },
    {
        name: "LIMITATION OF LIABILITY",
        text: "In no event will merchflow, its directors, shareholders, officers, employees, suppliers, agents, or representatives be liable for any lost profits, indirect, incidental, special, punitive or consequential damages, including damages due to loss of data or goodwill, arising out of these terms and conditions or the use of the merchflow services, even if merchflow has been advised of the possibility of such damages. Merchflow shall not be liable for procurement costs of substitute products or services or any unauthorized use or misuse of the services. You assume responsibility for the use and results of the services. Under no circumstances will merchflow’s total liability of any kind arising out of or related to these terms and conditions (including but not limited to warranty claims), regardless of the forum and regardless of whether any action or claim is based on contract, tort, or otherwise, exceed the total amount paid by you to merchflow during the immediately preceding twelve month period (as of the date of any final judgment in an action). The parties agree that this section shall survive and continue in full force and effect despite any failure of consideration or of an exclusive remedy. The parties acknowledge that the prices have been set and the terms and conditions entered into in reliance upon these limitations of liability and that all such limitations form an essential basis of the bargain between the parties. Because some states may not allow the exclusion or limitation of consequential or incidental damages, such limitations may not apply to you.",
    }
]

const termsWithSubHeadings = [
    {
        name: "Governing Law: ",
        class: 'mb_0',
        subheading: [
            {
                name: "Venue",
                text: "These Terms and Conditions shall be governed by the laws of the State of California, U.S.A., without regards to any choice of laws provisions thereof. The parties hereto agree to submit to the exclusive jurisdiction of the federal and state courts in the State of California, and they agree that venue shall be proper in Alameda County in the State of California."
            },
            {
                name: "Remedies",
                text: "You acknowledge that the unauthorized use, transfer, or disclosure of the Services will (a) substantially diminish the value to MerchFlow of the proprietary interest that are the subject of these Terms and Conditions; (b) render MerchFlow’s remedy at law for such unauthorized use, disclosure or transfer inadequate; and (c) cause irreparable injury in a short period of time. If you breach any of your obligations with respect to the use of the Services, MerchFlow shall be entitled to equitable relief to protect its interest therein, including but not limited to, preliminary and permanent injunctive relief without requirement of a bond and without the necessity of proving actual damages."
            },
            {
                name: "Attorney Fees",
                text: "In case of any action to enforce any rights or conditions of these Terms and Conditions, or appeal from said proceeding, it is mutually agreed that the losing party in such suit, action, proceeding or appeal shall pay the prevailing party’s reasonable attorney fees and costs incurred."
            },
        ]
    },
    {
        name: "Entire Agreement: ",
        class: 'mb_0',
        subheading: [
            {
                name: "Amendment",
                text: "These Terms and Conditions are a binding contract and constitute the entire agreement and understanding of the parties relating to the subject matter hereof, and are intended as the parties’ final expression and complete and exclusive statement of the terms hereof, superseding all prior or contemporaneous understandings. These Terms and Conditions may be amended or modified only by an instrument in writing by MerchFlow by providing a copy of such amendment to you in accordance with these Terms and Conditions with prior notice of the effectiveness thereof."
            },
            {
                name: "Non-Waiver",
                text: "No waiver of any provision of these Terms and Conditions shall constitute a waiver of any other provision, whether or not similar, nor shall any waiver constitute a continuing waiver. Failure to enforce any provision of these Terms and Conditions shall not operate as a waiver of such provision or any other provision or of the right to enforce such provision or any other provision."
            },
            {
                name: "No Third-Party Beneficiaries",
                text: "Nothing in these Terms and Conditions, express or implied, is intended to confer on any person, other than the parties to these Terms and Conditions, any right or remedy of any nature whatsoever."
            },
        ]
    },
    {
        name: "Severability: ",
        class: 'mb_0',
        subheading: [
            {
                name: "Binding Effect",
                text: "If any provision of these Terms and Conditions shall be invalid or unenforceable in any respect for any reason, the validity and enforceability of any such provision in any other respect and of the remaining provisions of these Terms and Conditions shall not be in any way impaired. These Terms and Conditions shall be binding on and inure to the benefit of the parties and their heirs, personal representatives and successors."
            },
            {
                name: "Force Majeure",
                text: "MerchFlow will not be liable for, or be considered to be in breach of or default under these Terms and Conditions on account of, any delay or failure to perform as required by these Terms and Conditions as a result of any cause or condition beyond MerchFlow’s reasonable control, so long as MerchFlow uses all commercially reasonable efforts to avoid or remove such causes of non-performance."
            },
            {
                name: "Relationship of Parties",
                text: "The parties agree that they are independent entities. Nothing in these Terms and Conditions shall be construed to create a partnership, joint venture, or agency relationship between the parties."
            },
            {
                name: "Indemnification",
                text: "You agree to indemnify, defend and hold harmless MerchFlow and its affiliates, directors, officers, employees, shareholders, agents and representatives from and against any losses, damages, liabilities, expenses (including reasonable attorneys’ fees), judgments and claims that arise out of or relate to (a) any breach by you of these Terms and Conditions and (b) your use of the Services. MerchFlow will: (i) give you prompt written notice of the claim; (b) grant you full and complete control over the defense and settlement of the claim; (c) assist you with the defense and settlement of the claim as you may reasonably request and at your expense; and (d) comply with any settlement or court order made in connection with the claim; provided that you may not settle or defend any claim unless it unconditionally releases MerchFlow of all liability.﻿"
            },
        ]
    }

]

export {
    heading,
    terms,
    termsWithSubHeadings
}