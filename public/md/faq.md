# FAQ

## Is Fabric Planning a Microsoft product or a third-party tool?

There is nothing to buy separately, no separate vendor contract, and no additional licensing. Fabric Planning ships as a first-party workload inside Fabric IQ called “Fabric Plan.” Microsoft has confirmed it as a first-party item. It runs on your existing Fabric capacity, governed by the same security model and admin controls as every other Fabric workload.

The technology was built by Lumel and licensed by Microsoft for exclusive native use within Fabric. Think of it like Microsoft Copilot: powered by OpenAI, but nobody calls it a third-party product. You buy it from Microsoft, you use it inside Microsoft, Microsoft supports it. Fabric Planning works the same way.

Fabric Planning is native. One platform, one security model, one vendor.

## What does Fabric Planning cost?

**Nothing is free, but there is no separate pricing.** Fabric Planning follows the same all-inclusive pricing model as every other Fabric workload. There is no separate license, no additional SKU, and no per-user fee.

Like any Fabric workload, Fabric Planning consumes capacity units (CUs). Consumption varies based on user type: Planners (authors, modelers, and admins), Stakeholders (data entry, approvals, comments, and writeback), and Viewers (view and interact locally). That consumption smooths over a 30-day period. You can get started with as little as an F2 capacity, though higher workloads will naturally require more. The cost structure follows the same reservation versus pay-as-you-go model you are already familiar with from Fabric.

This is where Fabric Planning fundamentally breaks from traditional EPM tools. With those platforms, if you have 200 budget contributors who only enter data for three months out of the year, you are still paying for all 200 licenses for all 12 months. With Fabric, you only consume capacity when those users are actively working. You can scale up your Fabric capacity during budget season and scale it back down when that cycle ends. You pay for what you use, when you use it.

A detailed cost calculator is coming soon and will be linked here once publicly available.

## How is Fabric Planning different from previous planning solutions that worked with Power BI?

For context on where the planning market stood before this shift, see the [FP&A Market Guide](https://datacrafters.io/wp-content/uploads/2025/06/FPA-Market-guide.pdf) co-authored by Khaled Chowdhury and Paul Barnhurst.

Every third-party Power BI planning solution in the Microsoft ecosystem followed the same pattern: a custom visual built on the Power BI SDK, connected to a separate modeling engine, writing data back to Fabric SQL or another database. None of these custom visuals were certified by Microsoft, which created a real challenge from a security and CISO perspective, because an uncertified visual could technically send data anywhere.

Fabric Planning is architecturally different. It is not a custom visual built on the Power BI SDK. It is a native Fabric workload, a Fabric artifact inside Fabric IQ. The planning application and the data reside in the same platform, secured and certified by Microsoft. There is no external modeling engine, no uncertified component, and no separate license for the front end versus the back end.

This is not a repackaging of the old approach. The Power BI SDK is a well-known bottleneck that has not seen significant improvement in a long time. Even though Lumel’s planning expertise and concepts carry forward, the Fabric Planning workload was built from the ground up without the limitations of the Power BI SDK.

When previous solutions claimed they were “part of Fabric,” what they meant was that they wrote back to Fabric SQL. Fabric Planning is built inside Fabric, governed by Fabric, and secured by Fabric. The app and the data live in one place.

## What happened to PerformancePoint? Will Fabric Planning suffer the same fate?

This is a fair concern. Microsoft deprecated PerformancePoint Services, and firms that built FP&A practices around it were left to find alternatives. That history is real and people remember it.

The structural difference is that PerformancePoint was a standalone product, maintained separately from the core data platform. When Microsoft shifted priorities, it was easy to cut. Fabric Planning is embedded directly into Fabric IQ as a native workload. Microsoft Fabric is not a side bet; it is one of Microsoft’s most strategic platform investments. Ripping a native workload out of your flagship data platform is a fundamentally different proposition than sunsetting a standalone product.

It is also worth noting how this was launched. Microsoft did not announce this as an ISV offering or a partner solution. It was announced as Fabric Planning, a Fabric workload, with a small “powered by Lumel” note. That positioning tells you where this is headed. Expect the Lumel name to fade into the background the same way you do not think about the vendor behind any other Fabric workload.

One of the underappreciated advantages of this model is that Fabric Planning has a dedicated development team. Unlike features built by Microsoft’s internal teams that compete for resources and shift with changing priorities, this team is focused entirely on planning. That focus means faster iteration and less risk of the feature stalling because a different initiative took priority internally.

Lumel is not an unproven vendor Microsoft took a chance on. Their team, a couple hundred employees strong, was seasoned through SAP. They had the planning technology, but the platform was not ready for it. Power BI changed that by giving them the adoption path, putting their tools in front of hundreds of enterprise customers through custom visuals that became market leaders. They won the [Best Overall EPM Vendor in 2025](https://lumel.com/best-overall-epm-vendor-2025/) (BPM Partners study) and the [Financial Modelling Innovation Award in 2020](https://valq.com/valq-wins-financial-modelling-innovation-awards-2020/). Fabric completed the picture by giving them a platform where the technology could be fully native, not constrained by the Power BI SDK. Microsoft took time to vet Lumel before making this the native planning and writeback solution. They chose a team and a product that had already won the market through Power BI and were ready to deliver at the platform level through Fabric.

There is also the adoption flywheel to consider. The path from Excel to Power BI to Fabric to Fabric Planning is a natural progression. There are over 20 million semantic models already built in Power BI. People are not starting from scratch. They are extending what they already have. That kind of installed base creates gravity that PerformancePoint never had.

Does that guarantee permanence? Nothing in technology is guaranteed. But the strategic importance of Fabric, the dedicated development team, the adoption flywheel, and how Microsoft chose to position this all point in a very different direction than PerformancePoint.

## I already use a Power BI planning solution. Should I switch to Fabric Planning?

Not necessarily, and definitely not right now just because something new exists. Fabric Planning is currently in preview. Making a migration decision based on a preview feature is premature.

If your current solution is working, it is working. Any time you change platforms, there is a real cost of change: migration effort, retraining, rebuilding models, and the inevitable disruption to a planning cycle that your business depends on. That cost needs to be weighed against what you gain.

That said, there are specific components within Fabric Planning worth exploring today even if you are not ready for a full switch. Data management through PowerTables and financial reporting through Intelligence Sheets are capabilities that can add value alongside what you already have, without requiring you to rip and replace anything.

When Fabric Planning moves to general availability, the decision becomes a proper evaluation: feature comparison, native integration benefits, security posture, total cost of ownership, and whether the consumption-based pricing model works better for your organization than your current licensing structure. Every coin has two sides, and no single solution is always better across every dimension.

The right move today is to try it, understand what it can do, and make a deliberate decision when the time is right.

## Will existing Power BI planning solutions go away?

In the near term, no. The Power BI SDK is still there, and the third-party planning solutions built on it are not being deprecated by Microsoft. Many of them are genuinely good products. We reviewed the landscape in the [FP&A Market Guide](https://datacrafters.io/wp-content/uploads/2025/06/FPA-Market-guide.pdf), and several of those solutions deliver real value.

That said, it is worth reading the writing on the wall. Power BI is not where Microsoft is putting its investment energy. Fabric is. The Power BI SDK has not seen significant improvement in a long time, and there is no indication that is changing. The solutions built on it will continue to work for the foreseeable future, but the platform underneath them is not evolving.

Will they be deprecated? I do not see that happening in the foreseeable future. Will they be significantly improved beyond where they are today? I do not see that happening in the foreseeable future either. The ceiling for what those solutions can do is largely set by the SDK they are built on, and that SDK is not moving.

Other vendors may build planning workloads on Fabric using the workload development kit, and some likely will. But those would be third-party Fabric workloads, not Microsoft offerings. Microsoft is not going to ship Fabric Planning version A and version B. There is one native planning workload, and that is Fabric Plan.

For organizations evaluating their long-term planning architecture, the trajectory matters as much as the current state. The current state is fine. The trajectory favors Fabric.

## What are the components of Fabric Planning?

Fabric Planning ships as a single Fabric Plan item that includes three integrated capabilities, all built on one Fabric foundation, sharing the same data, the same security, and the same backend. Each capability is organized around a different type of “sheet.” Sound familiar? Some things never change.

**Planning** is the core budgeting and forecasting engine. Build and manage enterprise plans directly on your semantic models. Collaborate across teams with cell-level commenting, multi-role workflows, and governed approvals. Plans write back to Fabric SQL automatically. Includes integrated budgeting and forecasting, scenario modeling and what-if analysis, and multi-role collaboration and approvals.

**Intelligence** is the variance reporting and analysis layer. Think of it as a visual and reporting layer for planning, built on Lumel’s 10+ years of developing financial visualizations. See plan versus actuals in a single, reconciled view. Variance measures are calculated automatically. Dashboards, storyboards, and ad-hoc analysis surface what matters without waiting for a separate BI cycle. Includes IBCS-certified financial reporting and ad-hoc analysis for business users.

**Data Management** handles forward-looking reference data. Your systems of record manage what exists today. Data Management manages what is coming: projected customers, planned products, future cost centers. Build no-code apps for any structured workflow, with row and column-level access control, approval routing, and 1:1 sync to Fabric SQL.

All three can be used together as a full planning suite or independently based on what you need. You do not have to adopt everything at once.

## What can I use today?

Fabric Planning is in preview. As a general rule, always be cautious about putting production workloads on preview features. That said, not all three components are at the same stage of maturity.

**Data Management (PowerTables)** was first announced at FabCon Europe last year and has had the most time to mature. Of the three components, this is the closest to production grade.

**Intelligence** is also well along. The financial reporting and visualization capabilities draw from Lumel’s 10+ years of building these tools, so the underlying technology is proven even if the Fabric-native packaging is still in preview.

**Planning** is where I would exercise the most caution, not because the technology is lacking, but because planning exposes a harder question: how good is your data? The technology is not the bottleneck anymore. Your data foundation is. If your actuals, your chart of accounts, and your dimensional structures are not clean, no planning tool will save you.

My recommendation: start simple. Pick something like expense planning where the data is well understood and the model is straightforward. Build confidence and prove out the workflow before moving to more complex use cases like revenue forecasting or workforce planning. Layer complexity on top of a working foundation, not the other way around.

## How do I get started with Fabric Planning?

Two steps:

For a simple walkthrough of how to turn it on, see [this guide](https://www.linkedin.com/posts/khaledchowdhury_fabricplanning-activity-7442229311375478784-h0y3?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAOgPv4B96tKfRGA5nLoihrDcl1UszNsQEA).

## Does Fabric Planning work on a Fabric trial?

Yes. Fabric Planning works on a Fabric trial capacity. I have tested it myself.

## Will my existing Fabric capacity handle Fabric Planning?

Most likely, yes. Fabric Planning consumption is driven by the number of users actively working in it, not by the complexity of what they are building. Each user type (Planner, Stakeholder, Viewer) has a different consumption pattern, and that consumption smooths over 30 days.

The real question is not “is my capacity big enough” but “how many people will be using it concurrently.” A small team experimenting with expense planning on an existing capacity is a very different workload than 200 budget contributors entering data during the same two-week window.

If you have a Fabric trial available, start there. It worked for me on trial capacity. That gives you a risk-free way to understand the consumption profile before committing any production capacity to it.

---
*Source: [FAQ](https://fabricplanning.io/faq/) | Generated from [FabricPlanning.io](https://fabricplanning.io/) | [Full site markdown](https://fabricplanning.io/llms-full.txt)*
