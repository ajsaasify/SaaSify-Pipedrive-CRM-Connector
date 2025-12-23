import { useCoSellContext } from "@template/context/Cosell.context";
import type { MarketplaceTransaction } from "@template/types/cosellResponse";
import { marketplaceSectionData as segments } from "@template/common/section/marketplace";
import { associateDisable } from "@template/component/actions/Buttons/actionDisabilityRules";
import AccordionComponent from "@template/component/ui-components/PipedriveAccordion";
import { AccordianTitle } from "@template/enum/accordian.enum";
import { Tile } from "@template/component/ui-components/detailview-components";
import PDAdvancedTable from "@template/component/ui-components/PipedriveTable";
import { AggrementTableColumn, type agreementType } from "./helper";
import { EmptyState } from "@template/component/ui-components/empty-data";

const DisplayAgreementTable: React.FC<{
  transaction?: MarketplaceTransaction[];
  offer?: MarketplaceTransaction[];
}> = ({ transaction = [] }) => {
  const agreements: agreementType[] = transaction.map((t) => {
    const {
      AgreementID,
      ServiceStartDate,
      ServiceEndDate,
      OfferID,
      AcceptanceTime,
    } = t?.MarketplaceAgreement ?? {};
    return {
      AgreementID,
      AcceptanceTime,
      ServiceEndDate,
      OfferID,
      ServiceStartDate,
    };
  });
  // console.log("agreements", transaction);
  return (
    <PDAdvancedTable
      enableGlobalFilter={false}
      data={transaction}
      columns={AggrementTableColumn}
      totalRecords={agreements?.length}
      rows={agreements?.length}
      first={0}
      emptyMessage={
        <EmptyState
          title="No AWS Marketplace agreements to display"
          description="To view agreements, you first need to associate an AWS Marketplace offer with this opportunity."
        />
      }
      showPaginator={false}
    ></PDAdvancedTable>
  );
};

export const MarketPlaceCard = () => {
  const { data } = useCoSellContext();
  const coSellEntity = data?.CoSellEntity;
  const transactions = coSellEntity?.MarketplaceTransactions ?? [];
  const LifeCycle = coSellEntity?.LifeCycle;
  const _isOfferPresent = transactions.some(
    (t: MarketplaceTransaction) => !!t?.MarketplaceOffer?.OfferID,
  );
  const _segmentData = segments(data);
  const _isAssociateDisabled = associateDisable(
    LifeCycle?.ReviewStatus,
    LifeCycle?.Stage,
    !!transactions[0]?.MarketplaceOffer?.OfferID,
    data?.CloudProviderIdentifier,
  );
  const agreements = transactions.filter(
    (t: MarketplaceTransaction) => !!t?.MarketplaceAgreement?.AgreementID,
  );
  return (
    <AccordionComponent
      className="card-view"
      items={[
        {
          id: "market_places",
          title: AccordianTitle.MARKETPLACE,
          children: (
            <>
              <div className="w-full">
                <Tile>
                  <h5>AWS Marketplace Offer</h5>
                  <hr />
                  <div className="mt-3">
                    <EmptyState
                      title="No AWS Marketplace offer to display"
                      description="You haven't associated an AWS Marketplace offer with this opportunity."
                      buttonLabel="Associate Offer"
                      buttonDisable={true}
                    />
                  </div>
                </Tile>
                <Tile>
                  <h5>AWS Marketplace Agreement</h5>
                  <hr />
                  <DisplayAgreementTable
                    transaction={agreements}
                    offer={transactions}
                  />
                </Tile>
              </div>
            </>
          ),
        },
      ]}
    ></AccordionComponent>
  );
};
