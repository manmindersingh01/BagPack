import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function Questions() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it free</AccordionTrigger>
        <AccordionContent>
          Yes , its free for now . But we got some premium plan for later
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>What kind of data can we store in here</AccordionTrigger>
        <AccordionContent>
          You can store any kind of data in here . But we recommend you to store data with size upto 20 mb for initail versions
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it  open Sourced</AccordionTrigger>
        <AccordionContent>
          Yes , it is open sourced. You can contribute to it by opening issues and making pull requests
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
